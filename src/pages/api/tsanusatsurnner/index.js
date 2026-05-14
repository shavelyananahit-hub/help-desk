// API՝ Ծանուցումներ — ցուցակ եւ ստեղծում (Notifications list & create)
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

  // GET — բոլոր ծանուցումները
  if (harc.method === 'GET') {
    try {
      const { kardatsvatsd, ogtater_id } = harc.query;
      const vorakavorutyun = {};
      if (kardatsvatsd !== undefined) vorakavorutyun.kardatsvatsd = kardatsvatsd === 'true';
      if (ogtater_id) vorakavorutyun.ogtater_id = ogtater_id;

      const bololTsanusatsurnner = await Tsanusatsurn.findAll({
        where: vorakavorutyun,
        include: [
          { model: Ogtater, as: 'stacoghogtater', attributes: ['id', 'anun', 'azganun'] },
          { model: Tiket, as: 'kapvatstiket', attributes: ['id', 'vernagir', 'kargavichak'] },
        ],
        order: [['created_at', 'DESC']],
      });
      return pataskhan.status(200).json({
        hajalutyun: true,
        tvyalner: bololTsanusatsurnner,
        qanak: bololTsanusatsurnner.length,
      });
    } catch (skhalt) {
      return pataskhan.status(500).json({ hajalutyun: false, skhalt: skhalt.message });
    }
  }

  // POST — նոր ծանուցում ստեղծել
  if (harc.method === 'POST') {
    try {
      const { haghordagutyun, tesak, ogtater_id, tiket_id } = harc.body;

      if (!haghordagutyun) {
        return pataskhan.status(400).json({ hajalutyun: false, skhalt: 'Հաղորդագրությունը պարտադիր է' });
      }

      const norTsanusatsurn = await Tsanusatsurn.create({
        haghordagutyun,
        tesak: tesak || 'Տեղեկություն',
        kardatsvatsd: false,
        ogtater_id: ogtater_id || null,
        tiket_id: tiket_id || null,
      });
      return pataskhan.status(201).json({ hajalutyun: true, tvyalner: norTsanusatsurn });
    } catch (skhalt) {
      return pataskhan.status(500).json({ hajalutyun: false, skhalt: skhalt.message });
    }
  }

  pataskhan.setHeader('Allow', ['GET', 'POST']);
  return pataskhan.status(405).json({ hajalutyun: false, skhalt: `Մեթոդը ${harc.method} թույլատրված չէ` });
}
