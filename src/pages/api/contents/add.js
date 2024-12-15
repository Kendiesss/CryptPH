import cloudinary from 'cloudinary';
import Contents from '@/models/Contents';
import dbConnect from '@/lib/db';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb', // Increase size limit
    },
  },
};

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const body = req.body;
      const imageURL = body.image;

      if (!imageURL || !imageURL.startsWith('https://res.cloudinary.com/')) {
        throw new Error('Invalid image URL');
      }

      let uploadResponse;
      let imagePublicId;

      // If image is already uploaded to Cloudinary, extract the public_id from the URL
      const urlParts = imageURL.split('/');
      const imageVersion = urlParts[urlParts.length - 2];
      const imagePublicIdFromURL = urlParts[urlParts.length - 1].split('.')[0];

      if (imagePublicIdFromURL) {
        // The image is already on Cloudinary, use the existing public ID
        imagePublicId = imagePublicIdFromURL;
      } else {
        // If the image is not from Cloudinary, upload it
        uploadResponse = await cloudinary.v2.uploader.upload(imageURL, {
          resource_type: 'image', // Ensure it's treated as an image
        });
        imagePublicId = uploadResponse.public_id; // Get the public ID from Cloudinary
      }

      // If the image was uploaded (not already on Cloudinary), use the new URL
      const image = uploadResponse ? uploadResponse.secure_url : imageURL;
      const imageType = `image/${imageURL.split('.').pop()}`;

      // Create a new Contents item with the Cloudinary image URL
      const ContentsItem = new Contents({
        title: body.title,
        category: body.category,
        image: image, // Use the image URL (either existing or uploaded)
        imageType: imageType, // Store the image type (e.g., 'image/png')
        imagePublicId: imagePublicId, // Store the public ID (from URL or upload)
        author: body.author,
        date: new Date(body.date),
        description: body.description,
      });

      await ContentsItem.save();
      res.status(200).json({ message: 'Contents added successfully', data: ContentsItem });
    } catch (error) {
      console.error('Error saving Contents:', error);
      res.status(500).json({ message: 'Failed to add Contents', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
