import dbConnect from '@/lib/db';
import faq from '@/models/faq'; // This will be your User model (see step 4)

export default async function handler(req, res) {
  try {
    await dbConnect();

    // Fetch all FAQs from the 'faq' collection in the database
    const faqs = await faq.find();

    // Send the faq data as a response
    res.status(200).json(faqs);
  } catch (error) {
    console.error('Error fetching faqs:', error);
    res.status(500).json({ message: 'Failed to fetch faqs' });
  }
}
