'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema('helpdesk').catch(() => {});
    await queryInterface.createTable({ tableName: 'ogtaterner', schema: 'helpdesk' }, {
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
      elektronerayin_hasce: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      herakhosahamer: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      der: {
        type: Sequelize.ENUM('Ադմինիստրատոր', 'Հաճախորդ', 'Աշխատակից'),
        defaultValue: 'Հաճախորդ',
        allowNull: false,
      },
      gtnayin_bard: {
        type: Sequelize.STRING(255),
        allowNull: false,
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
    await queryInterface.dropTable({ tableName: 'ogtaterner', schema: 'helpdesk' });
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "helpdesk"."enum_ogtaterner_der" CASCADE;');
  }
};
