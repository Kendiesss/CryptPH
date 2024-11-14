import News from '@/models/News';
import dbConnect from '@/lib/db';


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

            // Assuming body.image is a base64 string and you can extract the type from it
            const imageData = body.image.split(';');
            const imageType = imageData[0].split(':')[1]; // Get the MIME type

            // Create a new news item
            const newsItem = new News({
                title: body.title,
                category: body.category,
                image: body.image, // Base64 string
                imageType, // Add the extracted image type
                author: body.author,
                date: new Date(body.date),
                description: body.description,
            });

            await newsItem.save();
            res.status(200).json({ message: 'News added successfully', data: newsItem });
        } catch (error) {
            console.error('Error saving news:', error);
            res.status(500).json({ message: 'Failed to add news', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
