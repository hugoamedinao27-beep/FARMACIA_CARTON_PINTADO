const express = require('express');
const router = express.Router();
const medicamentoController = require('../controllers/medicamentoController');

// Ruta para obtener (GET)
router.get('/', medicamentoController.getMedicamentos);

// NUEVA RUTA: Para crear (POST)
router.post('/', medicamentoController.createMedicamento);

module.exports = router;