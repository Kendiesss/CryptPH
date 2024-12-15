import Content from '@/models/Contents';
import dbConnect from '@/lib/db';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        const { category } = req.query;

        try {
            const filter = category ? { category } : {};
            const contentItems = await Content.find(filter);
            res.status(200).json(contentItems);
        } catch (error) {
            console.error('Error fetching Content:', error);
            res.status(500).json({ message: 'Failed to fetch Content', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
