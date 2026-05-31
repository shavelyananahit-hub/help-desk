'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Տիկետների սկզբնական տվյալները (Initial tickets data)
  async up(queryInterface, Sequelize) {
    const [ogtaterner] = await queryInterface.sequelize.query('SELECT id FROM helpdesk.ogtaterner;');
    const [ashkhatakitsner] = await queryInterface.sequelize.query('SELECT id FROM helpdesk.ashkhatakitsner;');

    if (ogtaterner.length === 0) throw new Error('No users found to assign tickets');

    // Helper functions to safely get an ID
    const getOgtaterId = (index) => ogtaterner[index % ogtaterner.length].id;
    const getAshkhatakitsId = (index) => ashkhatakitsner.length > 0 ? ashkhatakitsner[index % ashkhatakitsner.length].id : null;

    await queryInterface.bulkInsert({ tableName: 'tiketer', schema: 'helpdesk' }, [
      {
        vernagir: 'Էլ. փոստ չի ուղարկվում',
        nkaragrutyun: 'Վերջին երկու ժամից ի վեր էլ. փոստի ուղարկումը չի աշխատում',
        kargnish: 'Բարձր',
        kargavichak: 'Բաց',
        kategoria: 'Էլ. փոստ',
        ogtater_id: getOgtaterId(0),
        ashkhatakits_id: getAshkhatakitsId(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        vernagir: 'Համակարգիչը դանդաղ է աշխատում',
        nkaragrutyun: 'Աշխատանքի համար գործածվող համակարգիչը շատ դանդաղ է, ինտերնետը ոչինչ չի բեռնվում',
        kargnish: 'Միջին',
        kargavichak: 'Ընթացիկ',
        kategoria: 'Ապարատներ',
        ogtater_id: getOgtaterId(1),
        ashkhatakits_id: getAshkhatakitsId(1),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        vernagir: 'Ցանցի հաճախականություն նվազած է',
        nkaragrutyun: 'Ցանցի արագությունը փոքր է, որոշ ծառայություններ չեն ռեսպոնսում',
        kargnish: 'Ցածր',
        kargavichak: 'Բաց',
        kategoria: 'Ցանց',
        ogtater_id: getOgtaterId(2),
        ashkhatakits_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        vernagir: 'Պրինտերը չի աշխատում',
        nkaragrutyun: 'Պրինտերի միացման խնդիր, գործարկվող Epson WF‑2830',
        kargnish: 'Բարձր',
        kargavichak: 'Փակված',
        kategoria: 'Տպիչ',
        ogtater_id: getOgtaterId(0),
        ashkhatakits_id: getAshkhatakitsId(2),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        vernagir: 'VPN միացված չէ',
        nkaragrutyun: 'VPN սերվերը չի աշխատում, սխալ 800',
        kargnish: 'Բարձր',
        kargavichak: 'Ընթացիկ',
        kategoria: 'VPN / Հաս անց',
        ogtater_id: getOgtaterId(1),
        ashkhatakits_id: getAshkhatakitsId(3),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'tiketer', schema: 'helpdesk' }, null, {});
  },
};
