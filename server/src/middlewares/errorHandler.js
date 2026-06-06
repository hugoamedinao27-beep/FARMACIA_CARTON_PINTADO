module.exports = (err, req, res, next) => {
  console.error('💥 Error Interno:', err.stack);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Ocurrió un error inesperado en el servidor de la farmacia.'
  });
};