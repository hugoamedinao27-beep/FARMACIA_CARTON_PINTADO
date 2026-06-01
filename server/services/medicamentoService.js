// Importamos los modelos desde el index.js de la carpeta models
const db = require('../models');

const getAll = async () => {
  // Usamos db.medicamento o db.Medicamento asegurando que encuentre el objeto
  const modeloMedicamento = db.Medicamento || db.medicamento;
  return await modeloMedicamento.findAll();
};

const create = async (datosMedicamento) => {
  // Aseguramos capturar el modelo sin importar si quedó en mayúscula o minúscula
  const modeloMedicamento = db.Medicamento || db.medicamento;
  return await modeloMedicamento.create(datosMedicamento);
};

module.exports = { 
  getAll, 
  create 
};