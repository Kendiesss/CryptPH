import nodemailer from 'nodemailer';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, subject, content } = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ust.crypt.ph@gmail.com', // Your email
        pass: 'jsdv guyc pgug cxbe',    // Your email app password
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    });

    const mailOptions = {
      from: email,
      to: 'ust.crypt.ph@gmail.com', // Email to receive feedback
      subject: `Feedback: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${content}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Feedback sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send feedback' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
};
