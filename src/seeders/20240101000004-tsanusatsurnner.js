'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Ծanusatsurnner-ի sknzbnakan tvalyalnery (Initial notifications data)
    await queryInterface.bulkInsert('tsanusatsurnner', [
      {
        haghordagutyun: 'Ձerr "Էla poste chi ugharkvum" tikety hajtiwt kazmarvets',
        tesak: 'Հաջողություն',
        kardatsvatsd: false,
        ogtater_id: 2,
        tiket_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        haghordagutyun: 'Ձer "Hamakargichh dandagh e" tikety handnvets Կարեն Մկրտչյան-in',
        tesak: 'Տեղեկություն',
        kardatsvatsd: true,
        ogtater_id: 3,
        tiket_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        haghordagutyun: 'Bnagits skzbnakan mot katem, pahanjvum e zkhushatsumen',
        tesak: 'Զgushatsumn',
        kardatsvatsd: false,
        ogtater_id: 2,
        tiket_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        haghordagutyun: 'Yadrek sargik hashvit khndri lutsme lratsnel',
        tesak: 'Տեղեkutyun',
        kardatsvatsd: false,
        ogtater_id: 4,
        tiket_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        haghordagutyun: 'Printer-i khndire hajolothabar lutsvets',
        tesak: 'Հajoghuthyun',
        kardatsvatsd: true,
        ogtater_id: 2,
        tiket_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tsanusatsurnner', null, {});
  },
};
