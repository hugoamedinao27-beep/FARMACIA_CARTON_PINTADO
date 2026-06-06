const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../../config/config.js').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Inicializaciones
db.User = require('./user')(sequelize, DataTypes);
db.Medicamento = require('./medicamento')(sequelize, DataTypes);
db.Venta = require('./venta')(sequelize, DataTypes);
db.DetalleVenta = require('./detalleVenta')(sequelize, DataTypes);

// Mapeo automático de relaciones estructurales
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;