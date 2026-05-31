'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    const today = new Date();

    for (let i = 365; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      data.push({
        date: dateStr,
        tickets_count: Math.floor(Math.random() * 20) + 1,
        users_count: Math.floor(Math.random() * 5) + 1,
        employees_count: Math.floor(Math.random() * 2),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert({ tableName: 'statistics', schema: 'helpdesk' }, data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({ tableName: 'statistics', schema: 'helpdesk' }, null, {});
  },
};
