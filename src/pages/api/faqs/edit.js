import dbConnect from '@/lib/db'; // Adjust path as necessary
import FAQ from '@/models/faq'; // Your FAQ model

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
    const { question, answer, category, image } = req.body; // Remove author, keep category and image

    try {
      // Update the FAQ item based on the provided ID and fields
      const updatedFAQ = await FAQ.findByIdAndUpdate(
        id,
        {
          question,    // Update question field
          answer,      // Update answer field
          category,    // Include category field
          createdAt: new Date(), // Update createdAt to current date and time
        },
        { new: true } // Returns the updated document
      );

      if (!updatedFAQ) {
        return res.status(404).json({ message: 'FAQ item not found' });
      }

      // Send a success response with the updated FAQ item
      res.status(200).json(updatedFAQ);
    } catch (error) {
      res.status(500).json({ message: 'Error updating FAQ item', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
