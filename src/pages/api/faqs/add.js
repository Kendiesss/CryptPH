import FAQ from '@/models/faq';
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

            // Create a new FAQ item
            const faqItem = new FAQ({
                question: body.question,
                answer: body.answer,
                category: body.category, // Optional: categorize FAQs if needed
                createdAt: new Date(),
                isVisible: body.isVisible !== undefined ? body.isVisible : true, // Default to visible
            });

            await faqItem.save();
            res.status(200).json({ message: 'FAQ added successfully', data: faqItem });
        } catch (error) {
            console.error('Error saving FAQ:', error);
            res.status(500).json({ message: 'Failed to add FAQ', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
