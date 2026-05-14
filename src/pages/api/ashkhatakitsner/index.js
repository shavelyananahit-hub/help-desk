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
        hajalutyun: true,
        tvyalner: bololAshkhatakitsner,
        qanak: bololAshkhatakitsner.length,
      });
    } catch (skhalt) {
      return pataskhan.status(500).json({ hajalutyun: false, skhalt: skhalt.message });
    }
  }

  // POST — նոր աշխատակից ստեղծել
  if (harc.method === 'POST') {
    try {
      const { anun, azganun, bakhum, pashton, elektronerayin_hasce, herakhosahamer, aktiv } = harc.body;

      if (!anun || !azganun || !elektronerayin_hasce) {
        return pataskhan.status(400).json({ hajalutyun: false, skhalt: 'Անհրաժեշտ դաշտերը լրացված չեն' });
      }

      const norAshkhatakits = await Ashkhatakits.create({
        anun, azganun, bakhum, pashton, elektronerayin_hasce, herakhosahamer,
        aktiv: aktiv !== undefined ? aktiv : true,
      });
      return pataskhan.status(201).json({ hajalutyun: true, tvyalner: norAshkhatakits });
    } catch (skhalt) {
      if (skhalt.name === 'SequelizeUniqueConstraintError') {
        return pataskhan.status(409).json({ hajalutyun: false, skhalt: 'Էլ. հասցեն արդեն գրանցված է' });
      }
      return pataskhan.status(500).json({ hajalutyun: false, skhalt: skhalt.message });
    }
  }

  pataskhan.setHeader('Allow', ['GET', 'POST']);
  return pataskhan.status(405).json({ hajalutyun: false, skhalt: `Մեթոդը ${harc.method} թույլատրված չէ` });
}
