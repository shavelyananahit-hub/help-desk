'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable({ tableName: 'tiketer', schema: 'helpdesk' }, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      vernagir: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      nkaragrutyun: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      kargnish: {
        type: Sequelize.ENUM('Ցածր', 'Միջին', 'Բարձր'),
        defaultValue: 'Միջին',
        allowNull: false,
      },
      kargavichak: {
        type: Sequelize.ENUM('Բաց', 'Ընթացիկ', 'Փակված'),
        defaultValue: 'Բաց',
        allowNull: false,
      },
      kategoria: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ogtater_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: { tableName: 'ogtaterner', schema: 'helpdesk' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      ashkhatakits_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: { tableName: 'ashkhatakitsner', schema: 'helpdesk' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable({ tableName: 'tiketer', schema: 'helpdesk' });
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "helpdesk"."enum_tiketer_kargnish" CASCADE;');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "helpdesk"."enum_tiketer_kargavichak" CASCADE;');
  }
};
