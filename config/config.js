require('dotenv').config();

// Romper la URL de la base de datos para que Sequelize la entienda bien
const url = process.env.DATABASE_URL || "mysql://root:Hamo1010@127.0.0.1:3306/farmacia_db";

module.exports = {
  development: {
    username: url.split('://')[1].split(':')[0],
    password: url.split(':')[2].split('@')[0],
    database: url.split('@')[1].split('/')[1],
    host: url.split('@')[1].split('/')[0].split(':')[0],
    port: url.split('@')[1].split('/')[0].split(':')[1] || 3306,
    dialect: 'mysql',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};