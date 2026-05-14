'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Աշխատակիցների սկզբնական տվյալները (Initial employees data)
    await queryInterface.bulkInsert('ashkhatakitsner', [
      {
        anun: 'Կարեն',
        azganun: 'Մkartchyan',
        bakhum: 'Տեղեկատվական Տեխնոլոգիաներ',
        pashton: 'Ավագ ծրագրավորող',
        elektronerayin_hasce: 'karen.mkrtchyan@helpdesk.am',
        herakhosahamer: '+374 91 111222',
        aktiv: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        anun: 'Նարե',
        azganun: 'Կarapetiank',
        bakhum: 'Հաճախորդների Սպասարկում',
        pashton: 'Աջակցության Ղեկավար',
        elektronerayin_hasce: 'nare.karapetyan@helpdesk.am',
        herakhosahamer: '+374 94 222333',
        aktiv: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        anun: 'Տիգրան',
        azganun: 'Ստեփանյան',
        bakhum: 'Ենթակառուցվածք',
        pashton: 'Համակարգային Ադմինիստրատոր',
        elektronerayin_hasce: 'tigran.stepanyan@helpdesk.am',
        herakhosahamer: '+374 77 333444',
        aktiv: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        anun: 'Սոֆի',
        azganun: 'Ղրիgorian',
        bakhum: 'Ցանց',
        pashton: 'Ցանցային Ճարտարագետ',
        elektronerayin_hasce: 'sofi.grigoryan@helpdesk.am',
        herakhosahamer: '+374 93 444555',
        aktiv: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ashkhatakitsner', null, {});
  },
};
