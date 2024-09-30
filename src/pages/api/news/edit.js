import dbConnect from '@/lib/db'; // Adjust path as necessary
import News from '@/models/News'; // Your news model

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'PUT') {
    const { id } = req.query; // Assuming you pass the ID in the query parameters
    const { title, description, date, category, author, image } = req.body; // Add category, author, and image

        try {
        const updatedNews = await News.findByIdAndUpdate(
            id,
            {
            title,
            description,
            date,
            category, // Include this
            author,   // Include this
            image,    // Include this
            },
            { new: true }
        );


      if (!updatedNews) {
        return res.status(404).json({ message: 'News item not found' });
      }

      // Send a success response with the updated news item
      res.status(200).json(updatedNews);
    } catch (error) {
      res.status(500).json({ message: 'Error updating news item', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
