// API՝ Օգտատերներ — ցուցակ եւ ստեղծում (Users list & create)
import { Ogtater, syncBaza } from '../../../models/index.js';
import bcrypt from 'bcryptjs';

let bazayiPatrastvatsvatsvats = false;

async function nakhapatarastel() {
  if (!bazayiPatrastvatsvatsvats) {
    await syncBaza();
    bazayiPatrastvatsvatsvats = true;
  }
}

export default async function ashkhatakogh(harc, pataskhan) {
  await nakhapatarastel();

  // GET — բոլոր օգտատերները
  if (harc.method === 'GET') {
    try {
      const bololOgtaterneр = await Ogtater.findAll({
        attributes: { exclude: ['gtnayin_bard'] },
        order: [['created_at', 'DESC']],
      });
      return pataskhan.status(200).json({
        hajalutyun: true,
        tvyalner: bololOgtaterneр,
        qanak: bololOgtaterneр.length,
      });
    } catch (skhalt) {
      return pataskhan.status(500).json({ hajalutyun: false, skhalt: skhalt.message });
    }
  }

  // POST — նոր օգտատեր ստեղծել
  if (harc.method === 'POST') {
    try {
      const { anun, azganun, elektronerayin_hasce, herakhosahamer, der, gtnayin_bard } = harc.body;

      if (!anun || !azganun || !elektronerayin_hasce || !gtnayin_bard) {
        return pataskhan.status(400).json({
          hajalutyun: false,
          skhalt: 'Անհրաժեշտ դաշտերը լրացված չեն',
        });
      }

      const gakhtnagrelBard = await bcrypt.hash(gtnayin_bard, 10);

      const norOgtater = await Ogtater.create({
        anun,
        azganun,
        elektronerayin_hasce,
        herakhosahamer,
        der: der || 'Հաճախորդ',
        gtnayin_bard: gakhtnagrelBard,
      });

      const { gtnayin_bard: _, ...ogtaterArevantsKunqov } = norOgtater.toJSON();
      return pataskhan.status(201).json({ hajalutyun: true, tvyalner: ogtaterArevantsKunqov });
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
