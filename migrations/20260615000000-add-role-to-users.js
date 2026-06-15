'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'user'
    });
    await queryInterface.sequelize.query(
      `UPDATE Users SET role = 'admin' WHERE email = 'hugoamedinao27@gmail.com'`
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'role');
  }
};
