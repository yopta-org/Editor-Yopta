'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable('blocks', {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: DataTypes.literal('uuid_generate_v4()'),
        },
        documentId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'documents',
            key: 'id',
          }
        },

        value: {
          type: DataTypes.JSONB,
          allowNull: false,
          defaultValue: [],
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        meta: {
          type: DataTypes.JSONB,
          allowNull: false,
          defaultValue: {},
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
    });
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('blocks', { transaction });
    });
  },
};
