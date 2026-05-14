'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Տիկետների սկզբնական տվյալները (Initial tickets data)
    await queryInterface.bulkInsert('tiketer', [
      {
        vernagir: 'Էլ. փոստ չի ուղարկվում',
        nkaragrutyun: 'Վերջին 2 ժամից ի վեր կորպorative էլ. փոստի ուղարկումը չի աշխատում',
        kargnish: 'Բարձր',
        kargavichak: 'Բաց',
        kategoria: 'Էլ. Փոստ',
        ogtater_id: 2,
        ashkhatakits_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        vernagir: 'Համակարգիչը դանդաղ է աշխատում',
        nkaragrutyun: 'Իմ աշխատանքային համակarjichy-ն շատ դանդաղ է, հատկapesy մինչdatev ինտernernet-ն',
        kargnish: 'Միջին',
        kargavichak: 'Ընթացիկ',
        kategoria: 'Ապaratkaz',
        ogtater_id: 3,
        ashkhatakits_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        vernagir: 'Ցanc-ի մutuqe չist',
        nkaragrutyun: 'Կorsound գaghtnabi չem karolanum mtnel korutyunner',
        kargnish: 'Ցածր',
        kargavichak: 'Բաց',
        kategoria: 'Ցanc',
        ogtater_id: 4,
        ashkhatakits_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        vernagir: 'Printer-ը չistработает',
        nkaragrutyun: 'Grasenyakum printere cchi ardzagorcum, patrastvatsvatsvats e Epson WF-2830',
        kargnish: 'Բարձր',
        kargavichak: 'Փակված',
        kategoria: 'Sstsvatskar',
        ogtater_id: 2,
        ashkhatakits_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        vernagir: 'VPN chst muts',
        nkaragrutyun: 'Hashvabanum ashkhatem, VPN-y chi muts, error 800 es',
        kargnish: 'Բարձր',
        kargavichak: 'Ընthatsik',
        kategoria: 'VPN / Hrashan muts',
        ogtater_id: 3,
        ashkhatakits_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tiketer', null, {});
  },
};
