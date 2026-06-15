const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  logging: false
});
sequelize.authenticate()
  .then(() => { console.log('CONEXION OK'); process.exit(0); })
  .catch(e => { console.log('ERROR:', e.message); process.exit(1); });
