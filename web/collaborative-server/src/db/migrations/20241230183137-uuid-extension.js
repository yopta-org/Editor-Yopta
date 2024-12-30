'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'),

  down: async (queryInterface) => queryInterface.sequelize.query('DROP EXTENSION "uuid-ossp";'),
};
