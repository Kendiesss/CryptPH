// pages/api/auth/login.js
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    await dbConnect();

    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        console.log("User found:", user); // Debug: log user

        if (!user) {
            return res.status(400).json({ error: "User not found" }); // Temp: specific error
        }

        // Log the passwords for debugging
        console.log("Password provided:", password);             // Log the plaintext password
        console.log("Stored password (hash):", user.password);   // Log the hashed password in DB

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch); // Debug: log password match result

        if (!isMatch) {
            return res.status(400).json({ error: "Password incorrect" }); // Temp: specific error
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expiry
        );
        console.log("Generated Token:", token); // Debug: log token generation

        // Send token in response
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "An error occurred. Please try again." });
    }
}
