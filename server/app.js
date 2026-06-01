require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middlewares para poder recibir y entender el JSON de Postman
app.use(cors());
app.use(express.json());

// 2. Enlace real a las rutas que sí tienes creadas
const medicamentoRoutes = require('./routes/medicamentoRoutes');

// 3. Registrar tus rutas en el servidor
// Esto hace que la URL en Postman sea: http://localhost:3000/api/medicamentos
app.use('/api/medicamentos', medicamentoRoutes);

// 4. Ruta base de cortesía por si abres el navegador
app.get('/', (req, res) => {
  res.send('¡Servidor de Farmacia Carton Pintado corriendo impecable! 🚀');
});

// 5. Encender el motor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});