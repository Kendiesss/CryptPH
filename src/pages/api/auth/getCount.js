import dbConnect from '@/lib/db';
import User from '@/models/User'; // Ensure this path is correct

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        // Count users with the role "user"
        const userCount = await User.countDocuments({ role: 'user' });

        res.status(200).json({ userCount });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Error fetching user count' });
    }
}
