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

// 1. Configuración de CORS abierta para conectar Frontend y Backend sin bloqueos
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 2. Inyección de Endpoints de la API
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/medicamentos', medicamentoRoutes);
app.use('/api/v1/ventas', ventaRoutes);

// Fallback 404 para rutas no existentes
app.use((req, res) => {
  res.status(404).json({ error: true, message: `Ruta ${req.originalUrl} no encontrada.` });
});

// Middleware global de manejo de errores
app.use(errorHandler);

// 3. Forzamos el puerto 4000 para que no choque con el puerto 3000 de Nuxt
const PORT = 4000;

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