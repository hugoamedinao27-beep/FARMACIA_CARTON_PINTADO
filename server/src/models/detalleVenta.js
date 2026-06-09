module.exports = (sequelize, DataTypes) => {
  const DetalleVenta = sequelize.define('DetalleVenta', {
    ventaId: { type: DataTypes.INTEGER, allowNull: false },
    medicamentoId: { type: DataTypes.INTEGER, allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    precio_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
  }, { timestamps: true, tableName: 'DetalleVentas' });

  DetalleVenta.associate = (models) => {
    DetalleVenta.belongsTo(models.Venta, { foreignKey: 'ventaId' });
    DetalleVenta.belongsTo(models.Medicamento, { foreignKey: 'medicamentoId', as: 'medicamento' });
  };

  return DetalleVenta;
};