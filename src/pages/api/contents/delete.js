import cloudinary from 'cloudinary';
import Contents from '@/models/Contents';
import dbConnect from '@/lib/db';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
    await dbConnect();
    const { id, imagePublicId } = req.query;

    if (req.method === 'DELETE') {
        
        try {

            console.log('Received DELETE request with id:', id, 'and imagePublicId:', imagePublicId);

            // Check if imagePublicId exists, and delete the image from Cloudinary
            if (imagePublicId) {
                const deleteImageResponse = await cloudinary.v2.uploader.destroy(imagePublicId);
                console.log('Cloudinary Delete Response:', deleteImageResponse);
                if (deleteImageResponse.result !== 'ok') {
                    throw new Error('Failed to delete image from Cloudinary');
                }
            }

            // Delete the content from the database
         
            const deletedContent = await Contents.findByIdAndDelete(id);

            if (!deletedContent) {
                return res.status(404).json({ message: 'Content not found' });
            }

            res.status(200).json({ message: 'Content and image deleted successfully' });
        } catch (error) {
            console.error('Error deleting content:', error);
            res.status(500).json({ message: 'Failed to delete content', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
