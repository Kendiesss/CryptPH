
import dbConnect from '@/lib/db'; // Your MongoDB connection
import Contents from '@/models/Contents'; // Your Contents model

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const ContentsItem = await Contents.findById(id);
                if (!ContentsItem) {
                    return res.status(404).json({ message: 'Contents not found' });
                }
                res.status(200).json(ContentsItem);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching Contents item' });
            }
            break;

        // Handle other HTTP methods if needed (e.g., DELETE, PUT)

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
