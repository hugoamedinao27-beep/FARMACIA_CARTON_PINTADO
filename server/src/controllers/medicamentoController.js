const { Medicamento, sequelize } = require('../models');
const { Op } = require('sequelize');

exports.obtenerMedicamentos = async (req, res, next) => {
  try {
    const medicamentos = await Medicamento.findAll();
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
    const nuevo = await Medicamento.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) { next(error); }
};

exports.actualizarMedicamento = async (req, res, next) => {
  try {
    const { id } = req.params;
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