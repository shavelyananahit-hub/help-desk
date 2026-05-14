// API՝ Աշխատակից — ստանալ, թարմացնել, ջնջել (Employee get/update/delete)
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
  const { id: ashkhatakitsiId } = harc.query;

  // GET — մեկ աշխատակից
  if (harc.method === 'GET') {
    try {
      const gtvatsAshkhatakits = await Ashkhatakits.findByPk(ashkhatakitsiId);
      if (!gtvatsAshkhatakits) {
        return pataskhan.status(404).json({ hajalutyun: false, skhalt: 'Աշխատակիցը չի գտնվել' });
      }
      return pataskhan.status(200).json({ hajalutyun: true, tvyalner: gtvatsAshkhatakits });
    } catch (skhalt) {
      return pataskhan.status(500).json({ hajalutyun: false, skhalt: skhalt.message });
    }
  }

  // PUT — թարմացնել
  if (harc.method === 'PUT') {
    try {
      const gtvatsAshkhatakits = await Ashkhatakits.findByPk(ashkhatakitsiId);
      if (!gtvatsAshkhatakits) {
        return pataskhan.status(404).json({ hajalutyun: false, skhalt: 'Աշխատակիցը չի գտնվել' });
      }
      const { anun, azganun, bakhum, pashton, elektronerayin_hasce, herakhosahamer, aktiv } = harc.body;
      await gtvatsAshkhatakits.update({ anun, azganun, bakhum, pashton, elektronerayin_hasce, herakhosahamer, aktiv });
      return pataskhan.status(200).json({ hajalutyun: true, tvyalner: gtvatsAshkhatakits });
    } catch (skhalt) {
      if (skhalt.name === 'SequelizeUniqueConstraintError') {
        return pataskhan.status(409).json({ hajalutyun: false, skhalt: 'Էլ. հասցեն արդեն գրանցված է' });
      }
      return pataskhan.status(500).json({ hajalutyun: false, skhalt: skhalt.message });
    }
  }

  // DELETE — ջնջել
  if (harc.method === 'DELETE') {
    try {
      const gtvatsAshkhatakits = await Ashkhatakits.findByPk(ashkhatakitsiId);
      if (!gtvatsAshkhatakits) {
        return pataskhan.status(404).json({ hajalutyun: false, skhalt: 'Աշխատակիցը չի գտնվել' });
      }
      await gtvatsAshkhatakits.destroy();
      return pataskhan.status(200).json({ hajalutyun: true, haghordagutyun: 'Աշխատակիցը հաջողությամբ ջնջվել է' });
    } catch (skhalt) {
      return pataskhan.status(500).json({ hajalutyun: false, skhalt: skhalt.message });
    }
  }

  pataskhan.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return pataskhan.status(405).json({ hajalutyun: false, skhalt: `Մեթոդը ${harc.method} թույլատրված չէ` });
}
