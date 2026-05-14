'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Օգտատերների սկզբնական տվյալները (Initial users data)
    const gakhtnagrelBard = await bcrypt.hash('Nakhnayin123!', 10);

    await queryInterface.bulkInsert('ogtaterneр', [
      {
        anun: 'Արամ',
        azganun: 'Պետրոսյան',
        elektronerayin_hasce: 'aram.petrosyan@helpdesk.am',
        herakhosahamer: '+374 91 123456',
        der: 'Ադմինիստրատոր',
        gtnayin_bard: gakhtnagrelBard,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        anun: 'Մարիամ',
        azganun: 'Հակոբյան',
        elektronerayin_hasce: 'mariam.hakobyan@helpdesk.am',
        herakhosahamer: '+374 94 234567',
        der: 'Հաճախորդ',
        gtnayin_bard: gakhtnagrelBard,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        anun: 'Դավիթ',
        azganun: 'Սահակյան',
        elektronerayin_hasce: 'davit.sahakyan@helpdesk.am',
        herakhosahamer: '+374 77 345678',
        der: 'Հաճախորդ',
        gtnayin_bard: gakhtnagrelBard,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        anun: 'Անի',
        azganun: 'Ղազարյան',
        elektronerayin_hasce: 'ani.ghazaryan@helpdesk.am',
        herakhosahamer: '+374 93 456789',
        der: 'Հաճախորդ',
        gtnayin_bard: gakhtnagrelBard,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        anun: 'Վահե',
        azganun: 'Ավետիսյան',
        elektronerayin_hasce: 'vahe.avetisyan@helpdesk.am',
        herakhosahamer: '+374 55 567890',
        der: 'Աշխատակից',
        gtnayin_bard: gakhtnagrelBard,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ogtaterneр', null, {});
  },
};
