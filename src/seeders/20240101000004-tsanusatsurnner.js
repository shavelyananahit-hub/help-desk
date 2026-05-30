'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [ogtaterner] = await queryInterface.sequelize.query('SELECT id FROM helpdesk.ogtaterner;');
    const [tiketer] = await queryInterface.sequelize.query('SELECT id FROM helpdesk.tiketer;');

    if (ogtaterner.length === 0) throw new Error('No users found to assign notifications');

    // Helper functions to safely get an ID
    const getOgtaterId = (index) => ogtaterner[index % ogtaterner.length].id;
    const getTiketId = (index) => tiketer.length > 0 ? tiketer[index % tiketer.length].id : null;

    // Ծանուցումների սկզբնական տվյալները (Initial notifications data)
    await queryInterface.bulkInsert({ tableName: 'tsanusatsurnner', schema: 'helpdesk' }, [
      {
        haghordagutyun: 'Ձեր "Էլ. փոստ չի ուղարկվում" տիկետը հաջողությամբ կատարվեց',
        tesak: 'Հաջողություն',
        kardatsvatsd: false,
        ogtater_id: getOgtaterId(0),
        tiket_id: getTiketId(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        haghordagutyun: 'Ձեր "Համակարգիչը դանդաղ է աշխատում" տիկետը հանձնվեց Կարեն Մկրտչյանին',
        tesak: 'Տեղեկություն',
        kardatsvatsd: true,
        ogtater_id: getOgtaterId(1),
        tiket_id: getTiketId(1),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        haghordagutyun: 'Խնդրում ենք ստուգել համակարգը, պահանջվում է զգուշացում',
        tesak: 'Զգուշացում',
        kardatsvatsd: false,
        ogtater_id: getOgtaterId(0),
        tiket_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        haghordagutyun: 'Խնդրում ենք հաստատել խնդրի լուծումը',
        tesak: 'Տեղեկություն',
        kardatsvatsd: false,
        ogtater_id: getOgtaterId(2),
        tiket_id: getTiketId(2),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        haghordagutyun: 'Պրինտերի խնդիրը հաջողությամբ լուծվեց',
        tesak: 'Հաջողություն',
        kardatsvatsd: true,
        ogtater_id: getOgtaterId(0),
        tiket_id: getTiketId(3),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'tsanusatsurnner', schema: 'helpdesk' }, null, {});
  },
};
