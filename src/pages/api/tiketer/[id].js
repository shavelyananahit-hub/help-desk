// API՝ Տիկետ — ստանալ, թարմացնել, ջնջել (Ticket get/update/delete)
import { Tiket, Ogtater, Ashkhatakits, syncBaza } from '../../../models/index.js';

let bazayiPatrastvatsvatsvats = false;

async function nakhapatarastel() {
  if (!bazayiPatrastvatsvatsvats) {
    await syncBaza();
    bazayiPatrastvatsvatsvats = true;
  }
}

export default async function ashkhatakogh(harc, pataskhan) {
  await nakhapatarastel();
  const { id: tketId } = harc.query;

  const tiketKhmbagrovInclude = [
    { model: Ogtater, as: 'steghtsoghogtater', attributes: ['id', 'anun', 'azganun', 'elektronerayin_hasce'] },
    { model: Ashkhatakits, as: 'handnvatsAshkhatakits', attributes: ['id', 'anun', 'azganun', 'bakhum'] },
  ];

  // GET — մեկ տիկետ
  if (harc.method === 'GET') {
    try {
      const gtvatsТiket = await Tiket.findByPk(tketId, { include: tiketKhmbagrovInclude });
      if (!gtvatsТiket) {
        return pataskhan.status(404).json({ հաջողություն: false, սխալ: 'Տիկետը չի գտնվել' });
      }
      return pataskhan.status(200).json({ հաջողություն: true, tvyalner: gtvatsТiket });
    } catch (սխալ) {
      return pataskhan.status(500).json({ հաջողություն: false, սխալ: սխալ.message });
    }
  }

  // PUT — թարմացնել
  if (harc.method === 'PUT') {
    try {
      const gtvatsТiket = await Tiket.findByPk(tketId);
      if (!gtvatsТiket) {
        return pataskhan.status(404).json({ հաջողություն: false, սխալ: 'Տիկետը չի գտնվել' });
      }
      const { vernagir, nkaragrutyun, kargnish, kargavichak, kategoria, ogtater_id, ashkhatakits_id } = harc.body;
      await gtvatsТiket.update({ vernagir, nkaragrutyun, kargnish, kargavichak, kategoria, ogtater_id, ashkhatakits_id });
      const tarmarkacvatsТiket = await Tiket.findByPk(tketId, { include: tiketKhmbagrovInclude });
      return pataskhan.status(200).json({ հաջողություն: true, tvyalner: tarmarkacvatsТiket });
    } catch (սխալ) {
      return pataskhan.status(500).json({ հաջողություն: false, սխալ: սխալ.message });
    }
  }

  // DELETE — ջնջել
  if (harc.method === 'DELETE') {
    try {
      const gtvatsТiket = await Tiket.findByPk(tketId);
      if (!gtvatsТiket) {
        return pataskhan.status(404).json({ հաջողություն: false, սխալ: 'Տիկետը չի գտնվել' });
      }
      await gtvatsТiket.destroy();
      return pataskhan.status(200).json({ հաջողություն: true, haghordagutyun: 'Տիկետը հաջողությամբ ջնջվել է' });
    } catch (սխալ) {
      return pataskhan.status(500).json({ հաջողություն: false, սխալ: սխալ.message });
    }
  }

  pataskhan.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return pataskhan.status(405).json({ հաջողություն: false, սխալ: `Մեթոդը ${harc.method} թույլատրված չէ` });
}
