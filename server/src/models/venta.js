module.exports = (sequelize, DataTypes) => {
  const Venta = sequelize.define('Venta', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    numero_receta: { type: DataTypes.STRING, allowNull: true },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, { tableName: 'Ventas' });

  Venta.associate = (models) => {
    Venta.belongsTo(models.User, { foreignKey: 'userId' });
    Venta.hasMany(models.DetalleVenta, { foreignKey: 'ventaId', as: 'detalles' });
  };

  return Venta;
};