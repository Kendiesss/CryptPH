import dbConnect from '@/lib/db';
import News from '@/models/Contents';

export default async function handler(req, res) {
  await dbConnect();

  try {
    // Count documents based on category
    const newsCount = await News.countDocuments({ category: 'News' });
    const educationalArticlesCount = await News.countDocuments({ category: 'Education' });

    res.status(200).json({
      newsCount,
      educationalArticlesCount,
    });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ message: 'Error fetching counts' });
  }
}
