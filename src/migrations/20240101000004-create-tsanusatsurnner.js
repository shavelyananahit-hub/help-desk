'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable({ tableName: 'tsanusatsurnner', schema: 'helpdesk' }, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      haghordagutyun: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      kardatsvatsd: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      tesak: {
        type: Sequelize.ENUM('Տեղեկություն', 'Զգուշացում', 'Սխալ', 'Հաջողություն'),
        defaultValue: 'Տեղեկություն',
        allowNull: false,
      },
      ogtater_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: { tableName: 'ogtaterner', schema: 'helpdesk' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tiket_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: { tableName: 'tiketer', schema: 'helpdesk' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable({ tableName: 'tsanusatsurnner', schema: 'helpdesk' });
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "helpdesk"."enum_tsanusatsurnner_tesak" CASCADE;');
  }
};
