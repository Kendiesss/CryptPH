import dbConnect from '@/lib/db'; // Adjust path as necessary
import Content from '@/models/Contents'; // Your Content model
import cloudinary from 'cloudinary';

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

  if (req.method === 'PUT') {
    const { id } = req.query; // Assuming you pass the ID in the query parameters
    const { title, description, date, category, author, image } = req.body; // Add category, author, and image

    try {
      
      let imageUrl = image; 

      
      if (image && image.includes('base64')) {
        // Extract the base64 string (if the image is a base64 string)
        const imageData = image.split(';');
        const imageBase64 = imageData[1].split(',')[1]; // Get the base64 string
        
        // Upload the new image to Cloudinary
        const cloudinaryUpload = await cloudinary.uploader.upload(`data:${imageData[0]};base64,${imageBase64}`, {
          folder: 'Content_images', // Optional: Organize the image in a folder
        });

        // Use the Cloudinary secure URL for the updated image
        imageUrl = cloudinaryUpload.secure_url;
      }

      // Update the Content item
      const updatedContent = await Content.findByIdAndUpdate(
        id,
        {
          title,
          description,
          date,
          category, // Include category
          author,   // Include author
          image: imageUrl,  // Use the new or existing Cloudinary URL
        },
        { new: true }
      );

      if (!updatedContent) {
        return res.status(404).json({ message: 'Content item not found' });
      }

      // Send a success response with the updated Content item
      res.status(200).json(updatedContent);
    } catch (error) {
      res.status(500).json({ message: 'Error updating Content item', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
