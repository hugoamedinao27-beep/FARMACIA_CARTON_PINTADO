'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Hugo Medina',
        email: 'hugomedina@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('Medicamentos', [
      {
        nombre: 'Paracetamol 500mg',
        precio: 1500.00,
        stock: 50,
        stock_minimo: 10,
        receta_obligatoria: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Amoxicilina 500mg',
        precio: 4500.00,
        stock: 20,
        stock_minimo: 5,
        receta_obligatoria: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Ibuprofeno 400mg',
        precio: 1200.00,
        stock: 8,
        stock_minimo: 15,
        receta_obligatoria: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Medicamentos', null, {});
  }
};
