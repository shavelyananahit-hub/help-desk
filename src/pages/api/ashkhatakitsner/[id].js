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
        return pataskhan.status(404).json({ հաջողություն: false, սխալ: 'Աշխատակիցը չի գտնվել' });
      }
      return pataskhan.status(200).json({ հաջողություն: true, tvyalner: gtvatsAshkhatakits });
    } catch (սխալ) {
      return pataskhan.status(500).json({ հաջողություն: false, սխալ: սխալ.message });
    }
  }

  // PUT — թարմացնել
  if (harc.method === 'PUT') {
    try {
      const gtvatsAshkhatakits = await Ashkhatakits.findByPk(ashkhatakitsiId);
      if (!gtvatsAshkhatakits) {
        return pataskhan.status(404).json({ հաջողություն: false, սխալ: 'Աշխատակիցը չի գտնվել' });
      }
      const { anun, azganun, bakhum, pashton, elektronerayin_hasce, herakhosahamer, aktiv } = harc.body;
      await gtvatsAshkhatakits.update({ anun, azganun, bakhum, pashton, elektronerayin_hasce, herakhosahamer, aktiv });
      return pataskhan.status(200).json({ հաջողություն: true, tvyalner: gtvatsAshkhatakits });
    } catch (սխալ) {
      if (սխալ.name === 'SequelizeUniqueConstraintError') {
        return pataskhan.status(409).json({ հաջողություն: false, սխալ: 'Էլ. հասցեն արդեն գրանցված է' });
      }
      return pataskhan.status(500).json({ հաջողություն: false, սխալ: սխալ.message });
    }
  }

  // DELETE — ջնջել
  if (harc.method === 'DELETE') {
    try {
      const gtvatsAshkhatakits = await Ashkhatakits.findByPk(ashkhatakitsiId);
      if (!gtvatsAshkhatakits) {
        return pataskhan.status(404).json({ հաջողություն: false, սխալ: 'Աշխատակիցը չի գտնվել' });
      }
      await gtvatsAshkhatakits.destroy();
      return pataskhan.status(200).json({ հաջողություն: true, haghordagutyun: 'Աշխատակիցը հաջողությամբ ջնջվել է' });
    } catch (սխալ) {
      return pataskhan.status(500).json({ հաջողություն: false, սխալ: սխալ.message });
    }
  }

  pataskhan.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return pataskhan.status(405).json({ հաջողություն: false, սխալ: `Մեթոդը ${harc.method} թույլատրված չէ` });
}
