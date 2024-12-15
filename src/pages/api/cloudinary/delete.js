import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { public_id } = req.body;

        // console.log('Received public_id:', public_id); // Debugging log

        if (!public_id) {
            return res.status(400).json({ error: 'Missing public_id' });
        }

        try {
            const result = await cloudinary.uploader.destroy(public_id);
            if (result.result === 'ok') {
                res.status(200).json({ message: 'Image deleted successfully' });
            } else {
                res.status(400).json({ error: 'Failed to delete image' });
            }
        } catch (error) {
            console.error('Error deleting image from Cloudinary:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

