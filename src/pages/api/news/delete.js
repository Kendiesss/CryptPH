import dbConnect from '@/lib/db';
import News from '@/models/News';

export default async function handler(req, res) {
    await dbConnect();
    const { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            const deletedItem = await News.findByIdAndDelete(id);
            if (!deletedItem) {
                return res.status(404).json({ error: 'News item not found' });
            }
            res.status(200).json({ message: 'News item deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete news item' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
