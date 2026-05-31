import { Statistic, syncBaza } from '../../models';

export default async function handler(req, res) {
  try {
    await syncBaza();
    
    const count = await Statistic.count();
    if (count > 0) {
      return res.status(200).json({ success: true, message: 'Already seeded' });
    }

    const data = [];
    const today = new Date();

    for (let i = 365; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      data.push({
        date: dateStr,
        tickets_count: Math.floor(Math.random() * 20) + 1,
        users_count: Math.floor(Math.random() * 5) + 1,
        employees_count: Math.floor(Math.random() * 2),
      });
    }

    await Statistic.bulkCreate(data, { ignoreDuplicates: true });
    res.status(200).json({ success: true, message: 'Seeding done' });
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
