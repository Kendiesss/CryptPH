// /api/news/[id].js

import dbConnect from '@/lib/db'; // Your MongoDB connection
import News from '@/models/News'; // Your News model

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const newsItem = await News.findById(id);
                if (!newsItem) {
                    return res.status(404).json({ message: 'News not found' });
                }
                res.status(200).json(newsItem);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching news item' });
            }
            break;

        // Handle other HTTP methods if needed (e.g., DELETE, PUT)

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
