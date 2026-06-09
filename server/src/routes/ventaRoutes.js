const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, ventaController.createVenta);
router.get('/reporte', auth, ventaController.getReporte);
router.get('/historial', auth, ventaController.getHistorial);

module.exports = router;