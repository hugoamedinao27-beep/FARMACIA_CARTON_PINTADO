const express = require('express');
const router = express.Router();
const medicamentoController = require('../controllers/medicamentoController');
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

router.get('/', auth, medicamentoController.obtenerMedicamentos);
router.get('/alertas-stock', auth, medicamentoController.getAlertasStock);
router.get('/:id', auth, medicamentoController.obtenerMedicamentoPorId);

router.post('/', auth, admin, medicamentoController.crearMedicamento);
router.put('/:id', auth, admin, medicamentoController.actualizarMedicamento);
router.delete('/:id', auth, admin, medicamentoController.eliminarMedicamento);

module.exports = router;