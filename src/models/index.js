// Մոդելների ռեեստր եւ կապակցումներ (Model Registry & Associations)
import sequelizeCors from '../config/database.js';
import Ogtater from './Ogtater.js';
import Tiket from './Tiket.js';
import Ashkhatakits from './Ashkhatakits.js';
import Tsanusatsurn from './Tsanusatsurn.js';
import Statistic from './Statistic.js';

// Կապակցումներ (Associations)
// Օգտատեր → Տիկետ (1 to many)
Ogtater.hasMany(Tiket, { foreignKey: 'ogtater_id', as: 'tiketerKazmagortsvats' });
Tiket.belongsTo(Ogtater, { foreignKey: 'ogtater_id', as: 'steghtsoghogtater' });

// Աշխատակից → Տիկետ (1 to many)
Ashkhatakits.hasMany(Tiket, { foreignKey: 'ashkhatakits_id', as: 'handnvatsTicketer' });
Tiket.belongsTo(Ashkhatakits, { foreignKey: 'ashkhatakits_id', as: 'handnvatsAshkhatakits' });

// Օգտատեր → Ծանուցում (1 to many)
Ogtater.hasMany(Tsanusatsurn, { foreignKey: 'ogtater_id', as: 'tsanusatsurnner' });
Tsanusatsurn.belongsTo(Ogtater, { foreignKey: 'ogtater_id', as: 'stacoghogtater' });

// Տիկետ → Ծանուցում (1 to many)
Tiket.hasMany(Tsanusatsurn, { foreignKey: 'tiket_id', as: 'kapvatstsanusatsurnner' });
Tsanusatsurn.belongsTo(Tiket, { foreignKey: 'tiket_id', as: 'kapvatstiket' });

const updateStatistic = async (field) => {
  const today = new Date().toISOString().split('T')[0];
  try {
    const [stat, created] = await Statistic.findOrCreate({
      where: { date: today },
      defaults: {
        date: today,
        tickets_count: field === 'tickets_count' ? 1 : 0,
        users_count: field === 'users_count' ? 1 : 0,
        employees_count: field === 'employees_count' ? 1 : 0,
      }
    });

    if (!created) {
      await stat.increment(field, { by: 1 });
    }
  } catch (error) {
    console.error(`Error updating statistic for ${field}:`, error);
  }
};

Ogtater.afterCreate(() => updateStatistic('users_count'));
Tiket.afterCreate(() => updateStatistic('tickets_count'));
Ashkhatakits.afterCreate(() => updateStatistic('employees_count'));

// Sync function — ստեղծում է աղյուսակները եթե գոյություն չունեն
export async function syncBaza() {
  try {
    await sequelizeCors.authenticate();
    await sequelizeCors.sync({ alter: true });
    console.log('Տվյալների բազան հաջողությամբ համաժամեցվեց');
  } catch (սխալ) {
    console.error('Բազայի համաժամեցման սխալ:', սխալ);
    throw սխալ;
  }
}

export { Ogtater, Tiket, Ashkhatakits, Tsanusatsurn, Statistic, sequelizeCors };
