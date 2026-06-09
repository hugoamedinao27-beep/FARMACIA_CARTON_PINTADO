'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Medicamentos', 'categoria', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'General'
    });
    await queryInterface.addColumn('Medicamentos', 'descripcion', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Medicamentos', 'descripcion');
    await queryInterface.removeColumn('Medicamentos', 'categoria');
  }
};
