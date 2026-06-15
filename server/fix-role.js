const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'farmacia_carton_pintado',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log
  }
);

async function fix() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a MySQL');

    const [results] = await sequelize.query("SELECT COUNT(*) as has_role FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = '" + (process.env.DB_NAME || 'farmacia_carton_pintado') + "' AND TABLE_NAME = 'Users' AND COLUMN_NAME = 'role'");

    if (results[0].has_role === 0) {
      console.log('❌ Columna role NO existe. Agregándola...');
      await sequelize.query("ALTER TABLE Users ADD COLUMN role VARCHAR(50) NOT NULL DEFAULT 'user' AFTER password");
      await sequelize.query("UPDATE Users SET role = 'admin' WHERE email = 'hugoamedinao27@gmail.com'");
      console.log('✅ Columna role agregada correctamente');
    } else {
      console.log('✅ Columna role ya existe en la BD');
    }

    const [rows] = await sequelize.query("SELECT id, name, email, role FROM Users");
    console.log('\nUsuarios en la BD:');
    console.table(rows);

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await sequelize.close();
  }
}

fix();
