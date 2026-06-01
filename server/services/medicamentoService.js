// Importamos directamente el objeto db desde tu index.js de models
const db = require('../models');

const getAll = async () => {
  // Tu index ya guardó el modelo en db.Medicamento (con M mayúscula)
  return await db.Medicamento.findAll();
};

const create = async (datosMedicamento) => {
  // Usamos el modelo ya inicializado por tu index de forma limpia
  return await db.Medicamento.create(datosMedicamento);
};

module.exports = { 
  getAll, 
  create 
};