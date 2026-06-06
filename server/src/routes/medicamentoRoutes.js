const express = require('express');
const router = express.Router();
const medController = require('../controllers/medicamentoController');
const auth = require('../middlewares/authMiddleware');

router.get('/', medController.getAll);
router.get('/alertas', auth, medController.getAlertasStock);
router.post('/', auth, medController.create);

module.exports = router;