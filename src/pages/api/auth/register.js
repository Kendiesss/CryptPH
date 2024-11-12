// pages/api/auth/register.js
import dbConnect from "@/lib/db";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await dbConnect();

  const { firstName, lastName, email, password } = req.body;

  // Server-side password validation with detailed feedback
  const passwordErrors = [];
  if (password.length < 8) passwordErrors.push("at least 8 characters");
  if (!/[A-Z]/.test(password)) passwordErrors.push("an uppercase letter");
  if (!/[a-z]/.test(password)) passwordErrors.push("a lowercase letter");
  if (!/\d/.test(password)) passwordErrors.push("a number");
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password)) passwordErrors.push("a special character");

  if (passwordErrors.length > 0) {
    console.log("Password validation failed:", passwordErrors.join(", "));
    return res.status(400).json({
      error: `Password must contain ${passwordErrors.join(", ")}.`,
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user with authProvider set to "local" for email/password registration
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      authProvider: "local",
    });
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
}
