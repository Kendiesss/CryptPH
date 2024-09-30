import News from '@/models/News';
import dbConnect from '@/lib/db';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        const { category } = req.query;

        try {
            const filter = category ? { category } : {};
            const newsItems = await News.find(filter);
            res.status(200).json(newsItems);
        } catch (error) {
            console.error('Error fetching news:', error);
            res.status(500).json({ message: 'Failed to fetch news', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
