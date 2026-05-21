// API՝ Աշխատակիցներ — ցուցակ եւ ստեղծում (Employees list & create)
import { Ashkhatakits, syncBaza } from '../../../models/index.js';

let bazayiPatrastvatsvatsvats = false;

async function nakhapatarastel() {
  if (!bazayiPatrastvatsvatsvats) {
    await syncBaza();
    bazayiPatrastvatsvatsvats = true;
  }
}

export default async function ashkhatakogh(harc, pataskhan) {
  await nakhapatarastel();

  // GET — բոլոր աշխատակիցները
  if (harc.method === 'GET') {
    try {
      const bololAshkhatakitsner = await Ashkhatakits.findAll({
        order: [['created_at', 'DESC']],
      });
      return pataskhan.status(200).json({
        հաջողություն: true,
        tvyalner: bololAshkhatakitsner,
        qanak: bololAshkhatakitsner.length,
      });
    } catch (սխալ) {
      return pataskhan.status(500).json({ հաջողություն: false, սխալ: սխալ.message });
    }
  }

  // POST — նոր աշխատակից ստեղծել
  if (harc.method === 'POST') {
    try {
      const { anun, azganun, bakhum, pashton, elektronerayin_hasce, herakhosahamer, aktiv } = harc.body;

      if (!anun || !azganun || !elektronerayin_hasce) {
        return pataskhan.status(400).json({ հաջողություն: false, սխալ: 'Անհրաժեշտ դաշտերը լրացված չեն' });
      }

      const norAshkhatakits = await Ashkhatakits.create({
        anun, azganun, bakhum, pashton, elektronerayin_hasce, herakhosahamer,
        aktiv: aktiv !== undefined ? aktiv : true,
      });
      return pataskhan.status(201).json({ հաջողություն: true, tvyalner: norAshkhatakits });
    } catch (սխալ) {
      if (սխալ.name === 'SequelizeUniqueConstraintError') {
        return pataskhan.status(409).json({ հաջողություն: false, սխալ: 'Էլ. հասցեն արդեն գրանցված է' });
      }
      return pataskhan.status(500).json({ հաջողություն: false, սխալ: սխալ.message });
    }
  }

  pataskhan.setHeader('Allow', ['GET', 'POST']);
  return pataskhan.status(405).json({ հաջողություն: false, սխալ: `Մեթոդը ${harc.method} թույլատրված չէ` });
}
