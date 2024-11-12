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
            console.log("Login attempt with non-existent email:", email);
            return res.status(400).json({ error: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password provided:", password);
        console.log("Stored password (hash):", user.password);
        console.log("Password match result:", isMatch);

        if (!isMatch) {
            console.log("Incorrect password attempt for user:", email);
            return res.status(400).json({ error: "Password incorrect" });
        }

        // Generate JWT token
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables.");
            return res.status(500).json({ error: "Server configuration error. Please try again later." });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log("Generated JWT Token:", token);

        // Send the token in response
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "An error occurred. Please try again." });
    }
}
