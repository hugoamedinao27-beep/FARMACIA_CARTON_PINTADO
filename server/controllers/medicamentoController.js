const medicamentoService = require('../services/medicamentoService');

// 1. La función GET que ya tenías para listar
const getMedicamentos = async (req, res) => {
  try {
    const medicamentos = await medicamentoService.getAll();
    return res.status(200).json({ error: false, data: medicamentos });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Error al obtener medicamentos: " + error.message
    });
  }
};

// 2. NUEVA FUNCIÓN: Para recibir el JSON de Postman y guardarlo
const createMedicamento = async (req, res) => {
  try {
    const nuevoMedicamento = await medicamentoService.create(req.body);
    return res.status(201).json({
      error: false,
      message: "Medicamento creado con éxito",
      data: nuevoMedicamento
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Error al crear el medicamento: " + error.message
    });
  }
};

// Exportamos ambas funciones
module.exports = { getMedicamentos, createMedicamento };