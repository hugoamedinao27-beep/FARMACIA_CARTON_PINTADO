const { Medicamento, sequelize } = require('../models');
const { Op } = require('sequelize');

exports.obtenerMedicamentos = async (req, res, next) => {
  try {
    const { nombre, stockMin } = req.query;
    const where = {};
    if (nombre) {
      where.nombre = { [Op.like]: `%${nombre}%` };
    }
    if (stockMin) {
      where.stock = { [Op.gte]: Number(stockMin) };
    }
    const medicamentos = await Medicamento.findAll({ where });
    res.json(medicamentos);
  } catch (error) { next(error); }
};

exports.getAlertasStock = async (req, res, next) => {
  try {
    const criticos = await Medicamento.findAll({
      where: { stock: { [Op.lte]: sequelize.col('stock_minimo') } }
    });
    res.json(criticos);
  } catch (error) { next(error); }
};

exports.crearMedicamento = async (req, res, next) => {
  try {
    const { nombre, precio, stock } = req.body;
    if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
      return res.status(400).json({ error: true, message: 'El nombre del medicamento es obligatorio.' });
    }
    if (precio === undefined || precio === null || isNaN(Number(precio)) || Number(precio) <= 0) {
      return res.status(400).json({ error: true, message: 'El precio debe ser un número positivo.' });
    }
    if (stock === undefined || stock === null || isNaN(Number(stock)) || Number(stock) < 0) {
      return res.status(400).json({ error: true, message: 'El stock debe ser un número mayor o igual a 0.' });
    }
    const nuevo = await Medicamento.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) { next(error); }
};

exports.actualizarMedicamento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, precio, stock } = req.body;
    if (nombre !== undefined && (!nombre || typeof nombre !== 'string' || !nombre.trim())) {
      return res.status(400).json({ error: true, message: 'El nombre del medicamento no puede estar vacío.' });
    }
    if (precio !== undefined && (isNaN(Number(precio)) || Number(precio) <= 0)) {
      return res.status(400).json({ error: true, message: 'El precio debe ser un número positivo.' });
    }
    if (stock !== undefined && (isNaN(Number(stock)) || Number(stock) < 0)) {
      return res.status(400).json({ error: true, message: 'El stock debe ser un número mayor o igual a 0.' });
    }
    const actualizado = await Medicamento.update(req.body, { where: { id } });
    if (actualizado[0] === 0) {
      return res.status(404).json({ error: true, message: 'Medicamento no encontrado.' });
    }
    const medicamento = await Medicamento.findByPk(id);
    res.json(medicamento);
  } catch (error) { next(error); }
};

exports.eliminarMedicamento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eliminado = await Medicamento.destroy({ where: { id } });
    if (!eliminado) {
      return res.status(404).json({ error: true, message: 'Medicamento no encontrado.' });
    }
    res.json({ success: true, message: 'Medicamento eliminado correctamente.' });
  } catch (error) { next(error); }
};