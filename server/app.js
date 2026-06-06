const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); 

const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');
const medicamentoRoutes = require('./src/routes/medicamentoRoutes');
const ventaRoutes = require('./src/routes/ventaRoutes');
const errorHandler = require('./src/middlewares/errorHandler');
const db = require('./src/models'); 

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

// Inyección de Endpoints
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/medicamentos', medicamentoRoutes);
app.use('/api/v1/ventas', ventaRoutes);

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ error: true, message: `Ruta ${req.originalUrl} no encontrada.` });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente (GEN-03).');
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor API corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error de arranque:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;