'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable({ tableName: 'ashkhatakitsner', schema: 'helpdesk' }, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      anun: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      azganun: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      bakhum: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      pashton: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      elektronerayin_hasce: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      herakhosahamer: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      aktiv: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({ tableName: 'ashkhatakitsner', schema: 'helpdesk' });
  }
};
