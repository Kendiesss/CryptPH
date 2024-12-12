import dbConnect from '@/lib/db';
import FAQ from '@/models/faq';

export default async function handler(req, res) {
    await dbConnect();
    const { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            const deletedItem = await FAQ.findByIdAndDelete(id);
            if (!deletedItem) {
                return res.status(404).json({ error: 'FAQ item not found' });
            }
            res.status(200).json({ message: 'FAQ item deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete FAQ item' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
