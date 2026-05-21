// API՝ Ծանուցում — ստանալ, թարմացնել, ջնջել (Notification get/update/delete)
import { Tsanusatsurn, Ogtater, Tiket, syncBaza } from '../../../models/index.js';

let bazayiPatrastvatsvatsvats = false;

async function nakhapatarastel() {
  if (!bazayiPatrastvatsvatsvats) {
    await syncBaza();
    bazayiPatrastvatsvatsvats = true;
  }
}

export default async function ashkhatakogh(harc, pataskhan) {
  await nakhapatarastel();
  const { id: tsanusatsurniId } = harc.query;

  const tsanusatsurnKhmbagrovInclude = [
    { model: Ogtater, as: 'stacoghogtater', attributes: ['id', 'anun', 'azganun'] },
    { model: Tiket, as: 'kapvatstiket', attributes: ['id', 'vernagir', 'kargavichak'] },
  ];

  // GET — մեկ ծանուցում
  if (harc.method === 'GET') {
    try {
      const gtvatsTs = await Tsanusatsurn.findByPk(tsanusatsurniId, { include: tsanusatsurnKhmbagrovInclude });
      if (!gtvatsTs) {
        return pataskhan.status(404).json({ հաջողություն: false, սխալ: 'Ծանուցումը չի գտնվել' });
      }
      return pataskhan.status(200).json({ հաջողություն: true, tvyalner: gtvatsTs });
    } catch (սխալ) {
      return pataskhan.status(500).json({ հաջողություն: false, սխալ: սխալ.message });
    }
  }

  // PUT — թարմացնել (incl. mark as read)
  if (harc.method === 'PUT') {
    try {
      const gtvatsTs = await Tsanusatsurn.findByPk(tsanusatsurniId);
      if (!gtvatsTs) {
        return pataskhan.status(404).json({ հաջողություն: false, սխալ: 'Ծանուցումը չի գտնվել' });
      }
      const { haghordagutyun, tesak, kardatsvatsd, ogtater_id, tiket_id } = harc.body;
      await gtvatsTs.update({ haghordagutyun, tesak, kardatsvatsd, ogtater_id, tiket_id });
      const tarmarkacvatsTs = await Tsanusatsurn.findByPk(tsanusatsurniId, { include: tsanusatsurnKhmbagrovInclude });
      return pataskhan.status(200).json({ հաջողություն: true, tvyalner: tarmarkacvatsTs });
    } catch (սխալ) {
      return pataskhan.status(500).json({ հաջողություն: false, սխալ: սխալ.message });
    }
  }

  // DELETE — ջնջել
  if (harc.method === 'DELETE') {
    try {
      const gtvatsTs = await Tsanusatsurn.findByPk(tsanusatsurniId);
      if (!gtvatsTs) {
        return pataskhan.status(404).json({ հաջողություն: false, սխալ: 'Ծանուցումը չի գտնվել' });
      }
      await gtvatsTs.destroy();
      return pataskhan.status(200).json({ հաջողություն: true, haghordagutyun: 'Ծանուցումը հաջողությամբ ջնջվել է' });
    } catch (սխալ) {
      return pataskhan.status(500).json({ հաջողություն: false, սխալ: սխալ.message });
    }
  }

  pataskhan.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return pataskhan.status(405).json({ հաջողություն: false, սխալ: `Մեթոդը ${harc.method} թույլատրված չէ` });
}
