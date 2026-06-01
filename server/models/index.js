const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  logging: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar todos los modelos del dominio
db.Medicamento = require('./medicamento')(sequelize, DataTypes);
db.Venta = require('./venta')(sequelize, DataTypes);
db.DetalleVenta = require('./detalleVenta')(sequelize, DataTypes);

// Ejecutar las asociaciones automáticas (Relaciones)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;