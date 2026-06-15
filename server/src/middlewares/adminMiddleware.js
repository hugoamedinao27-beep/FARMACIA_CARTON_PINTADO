module.exports = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: true, message: 'Acceso denegado. Se requieren permisos de administrador.' });
  }
  next();
};
