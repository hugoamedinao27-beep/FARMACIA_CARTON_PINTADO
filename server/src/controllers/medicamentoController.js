const { Medicamento } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res, next) => {
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

exports.create = async (req, res, next) => {
  try {
    const nuevo = await Medicamento.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) { next(error); }
};