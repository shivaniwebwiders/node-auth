'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM('admin', 'seller', 'user'),
      allowNull: false,
      defaultValue: 'user',
      after: 'password' // optional: position it after 'password'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Sequelize requires ENUMs to be dropped explicitly in PostgreSQL/MySQL
    await queryInterface.removeColumn('Users', 'role');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_role";'); // PostgreSQL only
  }
};
