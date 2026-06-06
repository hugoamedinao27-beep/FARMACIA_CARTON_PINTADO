const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: true, message: 'Acceso denegado. Token no suministrado.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'ClaveSecretaEstiloFarmaciaCartonPintado2026!');
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: true, message: 'Token inválido o expirado.' });
  }
};