'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('documents', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.literal('uuid_generate_v4()'),
      },
      
      title: {
        type: DataTypes.STRING(250),
        allowNull: false,
        defaultValue: 'Untitled',
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  down: (queryInterface) => queryInterface.dropTable('documents'),
};
