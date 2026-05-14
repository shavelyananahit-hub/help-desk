// API՝ Տիկետներ — ցուցակ եւ ստեղծում (Tickets list & create)
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

  // GET — բոլոր տիկետները
  if (harc.method === 'GET') {
    try {
      const { kargavichak, kargnish } = harc.query;
      const vorakavorutyun = {};
      if (kargavichak) vorakavorutyun.kargavichak = kargavichak;
      if (kargnish) vorakavorutyun.kargnish = kargnish;

      const bololTiketer = await Tiket.findAll({
        where: vorakavorutyun,
        include: [
          { model: Ogtater, as: 'steghtsoghogtater', attributes: ['id', 'anun', 'azganun', 'elektronerayin_hasce'] },
          { model: Ashkhatakits, as: 'handnvatsAshkhatakits', attributes: ['id', 'anun', 'azganun', 'bakhum'] },
        ],
        order: [['created_at', 'DESC']],
      });
      return pataskhan.status(200).json({
        hajalutyun: true,
        tvyalner: bololTiketer,
        qanak: bololTiketer.length,
      });
    } catch (skhalt) {
      return pataskhan.status(500).json({ hajalutyun: false, skhalt: skhalt.message });
    }
  }

  // POST — նոր տիկետ ստեղծել
  if (harc.method === 'POST') {
    try {
      const { vernagir, nkaragrutyun, kargnish, kargavichak, kategoria, ogtater_id, ashkhatakits_id } = harc.body;

      if (!vernagir) {
        return pataskhan.status(400).json({ hajalutyun: false, skhalt: 'Վերնագիրը պարտադիր է' });
      }

      const norTiket = await Tiket.create({
        vernagir,
        nkaragrutyun,
        kargnish: kargnish || 'Միջին',
        kargavichak: kargavichak || 'Բաց',
        kategoria,
        ogtater_id: ogtater_id || null,
        ashkhatakits_id: ashkhatakits_id || null,
      });

      const tiketTvyalnerKhmbagrov = await Tiket.findByPk(norTiket.id, {
        include: [
          { model: Ogtater, as: 'steghtsoghogtater', attributes: ['id', 'anun', 'azganun'] },
          { model: Ashkhatakits, as: 'handnvatsAshkhatakits', attributes: ['id', 'anun', 'azganun'] },
        ],
      });
      return pataskhan.status(201).json({ hajalutyun: true, tvyalner: tiketTvyalnerKhmbagrov });
    } catch (skhalt) {
      return pataskhan.status(500).json({ hajalutyun: false, skhalt: skhalt.message });
    }
  }

  pataskhan.setHeader('Allow', ['GET', 'POST']);
  return pataskhan.status(405).json({ hajalutyun: false, skhalt: `Մեթոդը ${harc.method} թույլատրված չէ` });
}
