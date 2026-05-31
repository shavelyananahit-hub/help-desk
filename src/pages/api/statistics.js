import { Statistic } from '../../models';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const stats = await Statistic.findAll({
        order: [['date', 'ASC']],
      });
      res.status(200).json({ hajoghutyun: true, tvyalner: stats });
    } catch (sxal) {
      console.error('Վիճակագրություն բերելիս սխալ:', sxal);
      res.status(500).json({ hajoghutyun: false, sxal: 'Ներքին սխալ' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
