const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const tokenFromHeader = authHeader && authHeader.split(' ')[1];
  const token = tokenFromHeader || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: true, message: 'Acceso denegado. Token no suministrado.' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: true, message: 'Error del servidor: JWT_SECRET no configurado.' });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: true, message: 'Token inválido o expirado.' });
  }
};