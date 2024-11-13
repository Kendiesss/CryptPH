// pages/api/users.js
import dbConnect from '@/lib/db';
import User from '@/models/User'; // This will be your User model (see step 4)

export default async function handler(req, res) {
  try {
    await dbConnect();

    // Fetch all users from the 'users' collection in the database
    const users = await User.find();

    // Send the users data as a response
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
}
