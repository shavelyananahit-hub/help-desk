// Մոդելների ռեեստր եւ կապակցումներ (Model Registry & Associations)
import sequelizeCors from '../config/database.js';
import Ogtater from './Ogtater.js';
import Tiket from './Tiket.js';
import Ashkhatakits from './Ashkhatakits.js';
import Tsanusatsurn from './Tsanusatsurn.js';

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

export { Ogtater, Tiket, Ashkhatakits, Tsanusatsurn, sequelizeCors };
