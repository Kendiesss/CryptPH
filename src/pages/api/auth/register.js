// pages/api/auth/register.js
import dbConnect from "@/lib/db";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await dbConnect();

  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user with plain password, which will be hashed by the pre-save hook
    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // Pass the plain password; the pre-save hook will hash it
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
}
