// API՝ Օգտատեր — ստանալ, թարմացնել, ջնջել (User get/update/delete)
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
  const { id: ogtateriId } = harc.query;

  // GET — մեկ օգտատեր
  if (harc.method === 'GET') {
    try {
      const gtvatsOgtater = await Ogtater.findByPk(ogtateriId, {
        attributes: { exclude: ['gtnayin_bard'] },
      });
      if (!gtvatsOgtater) {
        return pataskhan.status(404).json({ հաջողություն: false, սխալ: 'Օգտատերը չի գտնվել' });
      }
      return pataskhan.status(200).json({ հաջողություն: true, tvyalner: gtvatsOgtater });
    } catch (սխալ) {
      return pataskhan.status(500).json({ հաջողություն: false, սխալ: սխալ.message });
    }
  }

  // PUT — թարմացնել
  if (harc.method === 'PUT') {
    try {
      const gtvatsOgtater = await Ogtater.findByPk(ogtateriId);
      if (!gtvatsOgtater) {
        return pataskhan.status(404).json({ հաջողություն: false, սխալ: 'Օգտատերը չի գտնվել' });
      }

      const { anun, azganun, elektronerayin_hasce, herakhosahamer, der, gtnayin_bard } = harc.body;
      const tarmarkacvatsTaghaktner = { anun, azganun, elektronerayin_hasce, herakhosahamer, der };

      if (gtnayin_bard) {
        tarmarkacvatsTaghaktner.gtnayin_bard = await bcrypt.hash(gtnayin_bard, 10);
      }

      await gtvatsOgtater.update(tarmarkacvatsTaghaktner);
      const { gtnayin_bard: _, ...pataskhanvatsTaghaktner } = gtvatsOgtater.toJSON();
      return pataskhan.status(200).json({ հաջողություն: true, tvyalner: pataskhanvatsTaghaktner });
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
      const gtvatsOgtater = await Ogtater.findByPk(ogtateriId);
      if (!gtvatsOgtater) {
        return pataskhan.status(404).json({ հաջողություն: false, սխալ: 'Օգտատերը չի գտնվել' });
      }
      await gtvatsOgtater.destroy();
      return pataskhan.status(200).json({ հաջողություն: true, haghordagutyun: 'Օգտատերը հաջողությամբ ջնջվել է' });
    } catch (սխալ) {
      return pataskhan.status(500).json({ հաջողություն: false, սխալ: սխալ.message });
    }
  }

  pataskhan.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return pataskhan.status(405).json({ հաջողություն: false, սխալ: `Մեթոդը ${harc.method} թույլատրված չէ` });
}
