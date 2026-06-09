module.exports = (sequelize, DataTypes) => {
  const Medicamento = sequelize.define('Medicamento', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    stock_minimo: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 5 },
    receta_obligatoria: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    categoria: { type: DataTypes.STRING, allowNull: true, defaultValue: 'General' },
    descripcion: { type: DataTypes.TEXT, allowNull: true }
  }, { tableName: 'Medicamentos' });

  Medicamento.associate = (models) => {
    Medicamento.hasMany(models.DetalleVenta, { foreignKey: 'medicamentoId' });
  };

  return Medicamento;
};