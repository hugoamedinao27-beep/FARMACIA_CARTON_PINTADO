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

exports.getHistorial = async (req, res, next) => {
  try {
    const historial = await Venta.findAll({
      include: [{ model: DetalleVenta, as: 'detalles', include: ['medicamento'] }]
    });
    res.json(historial);
  } catch (error) { next(error); }
};