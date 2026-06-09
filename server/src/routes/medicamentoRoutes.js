const express = require('express');
const router = express.Router();

// Importamos el controlador encargado de interactuar con el modelo de la Base de Datos
const medicamentoController = require('../controllers/medicamentoController');

/**
 * ------------------------------------------------------------------------
 * RUTAS PARA LA API DE MEDICAMENTOS (Endpoint Base: /api/v1/medicamentos)
 * ------------------------------------------------------------------------
 */

// 1. Obtener todos los medicamentos (Catálogo del Inventario)
// GET -> /api/v1/medicamentos
router.get('/', medicamentoController.obtenerMedicamentos);

// Alerta de stock bajo
router.get('/alertas-stock', medicamentoController.getAlertasStock);

// 2. Crear un nuevo medicamento en el sistema
// POST -> /api/v1/medicamentos
router.post('/', medicamentoController.crearMedicamento);

// 3. Actualizar un medicamento existente mediante su ID dinámico
// PUT -> /api/v1/medicamentos/:id
router.put('/:id', medicamentoController.actualizarMedicamento);

// 4. Eliminar permanentemente un medicamento mediante su ID dinámico
// DELETE -> /api/v1/medicamentos/:id
router.delete('/:id', medicamentoController.eliminarMedicamento);

module.exports = router;