'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
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
        stock_minimo: 15, // Provoca alerta de stock crítico inmediatamente
        receta_obligatoria: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Medicamentos', null, {});
  }
};