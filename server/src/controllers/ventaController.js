const { sequelize, Venta, DetalleVenta, Medicamento } = require('../models');

exports.createVenta = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { productos, numero_receta } = req.body; 
    const userId = req.user.id; 

    let totalVenta = 0;
    const detallesPlanificados = [];

    for (let p of productos) {
      const med = await Medicamento.findByPk(p.id, { transaction: t });
      if (!med) {
        await t.rollback();
        return res.status(404).json({ error: true, message: `El medicamento con ID ${p.id} no existe.` });
      }

      if (med.receta_obligatoria && !numero_receta) {
        await t.rollback();
        return res.status(400).json({ error: true, message: `El medicamento ${med.nombre} requiere número de receta obligatoria.` });
      }

      if (med.stock < p.cantidad) {
        await t.rollback();
        return res.status(400).json({ error: true, message: `Stock insuficiente para ${med.nombre}. Disponible: ${med.stock}` });
      }

      med.stock -= p.cantidad;
      await med.save({ transaction: t });

      const subtotal = med.precio * p.cantidad;
      totalVenta += parseFloat(subtotal);

      detallesPlanificados.push({
        medicamentoId: med.id,
        cantidad: p.cantidad,
        precio_unitario: med.precio
      });
    }

    const nuevaVenta = await Venta.create({
      userId,
      numero_receta,
      total: totalVenta
    }, { transaction: t });

    const detallesFinales = detallesPlanificados.map(d => ({ ...d, ventaId: nuevaVenta.id }));
    await DetalleVenta.bulkCreate(detallesFinales, { transaction: t });

    await t.commit();
    res.status(201).json({ 
      success: true, 
      message: 'Venta procesada con éxito y stock actualizado.', 
      ventaId: nuevaVenta.id, 
      total: totalVenta 
    });

  } catch (error) {
    await t.rollback();
    next(error);
  }
};

exports.getReporte = async (req, res, next) => {
  try {
    const { Op, fn, col, literal } = require('sequelize');

    const totalVentas = await Venta.count();
    const ingresos = parseFloat(await Venta.sum('total') || 0);
    const ventasConReceta = await Venta.count({ where: { numero_receta: { [Op.ne]: null } } });

    const totalUnidadesVendidas = await DetalleVenta.sum('cantidad') || 0;

    const ventaPromedio = totalVentas > 0 ? ingresos / totalVentas : 0;

    const productosDistintosVendidos = await DetalleVenta.count({
      distinct: true,
      col: 'medicamentoId'
    });

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);

    const ventasHoy = await Venta.count({
      where: { fecha: { [Op.gte]: hoy, [Op.lt]: manana } }
    });

    const ingresosHoy = parseFloat(await Venta.sum('total', {
      where: { fecha: { [Op.gte]: hoy, [Op.lt]: manana } }
    }) || 0);

    const medicamentosMasVendidos = await DetalleVenta.findAll({
      attributes: ['medicamentoId', [fn('SUM', col('cantidad')), 'total_vendido']],
      group: ['medicamentoId'],
      include: [{ model: Medicamento, as: 'medicamento', attributes: ['nombre'] }],
      order: [[literal('total_vendido'), 'DESC']],
      limit: 5
    });

    res.json({
      totalVentas,
      ingresos,
      ventasConReceta,
      totalUnidadesVendidas,
      ventaPromedio: Math.round(ventaPromedio * 100) / 100,
      productosDistintosVendidos,
      ventasHoy,
      ingresosHoy,
      medicamentosMasVendidos
    });
  } catch (error) { next(error); }
};

exports.getHistorial = async (req, res, next) => {
  try {
    const historial = await Venta.findAll({
      include: [{ model: DetalleVenta, as: 'detalles', include: ['medicamento'] }]
    });
    res.json(historial);
  } catch (error) { next(error); }
};