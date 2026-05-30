'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Օգտատերերի սկզբնական տվյալները (Initial users data)
    const hashedPassword = await require('bcryptjs').hash('Secret123!', 10);
    await queryInterface.bulkInsert({ tableName: 'ogtaterner', schema: 'helpdesk' }, [
      {
        anun: 'Արամ',
        azganun: 'Պետրոսյան',
        elektronerayin_hasce: 'aram.petrosyan@helpdesk.am',
        herakhosahamer: '+374 91 123456',
        der: 'Ադմինիստրատոր',
        gtnayin_bard: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        anun: 'Մարիամ',
        azganun: 'Հակոբյան',
        elektronerayin_hasce: 'mariam.hakobyan@helpdesk.am',
        herakhosahamer: '+374 94 234567',
        der: 'Հաճախորդ',
        gtnayin_bard: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        anun: 'Դավիթ',
        azganun: 'Սահակյան',
        elektronerayin_hasce: 'davit.sahakyan@helpdesk.am',
        herakhosahamer: '+374 77 345678',
        der: 'Հաճախորդ',
        gtnayin_bard: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        anun: 'Անի',
        azganun: 'Ղազարյան',
        elektronerayin_hasce: 'ani.ghazaryan@helpdesk.am',
        herakhosahamer: '+374 93 456789',
        der: 'Հաճախորդ',
        gtnayin_bard: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        anun: 'Վահե',
        azganun: 'Ավետիսյան',
        elektronerayin_hasce: 'vahe.avetisyan@helpdesk.am',
        herakhosahamer: '+374 55 567890',
        der: 'Աշխատակից',
        gtnayin_bard: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'ogtaterner', schema: 'helpdesk' }, null, {});
  }
};
