import dbConnect from '@/lib/db'; 
import News from '@/models/News'; 

export default async function handler(req, res) {
    await dbConnect(); 

    if (req.method === 'POST') {
        try {
            const newsItem = new News(req.body);
            await newsItem.save(); // Save the news item
            res.status(200).json({ message: 'News added successfully', data: newsItem });
        } catch (error) {
            console.error('Error saving news:', error);
            res.status(500).json({ message: 'Failed to add news' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
