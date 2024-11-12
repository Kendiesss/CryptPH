// pages/api/auth/forgot-password.js
import dbConnect from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    await dbConnect();

    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Generate a reset token and hash it
        const token = crypto.randomBytes(20).toString("hex");
        const hashedToken = await bcrypt.hash(token, 10); // Hash the token before saving
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

        await user.save();

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Include the plain token in the URL, while the hashed version is stored in the database
        const resetUrl = `http://${req.headers.host}/reset-password?token=${token}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset",
            text: `You are receiving this email because you requested a password reset for your account.\n\n
            Please click on the following link, or paste it into your browser to complete the process:\n
            ${resetUrl}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Reset password email sent" });
    } catch (error) {
        console.error("Error in forgot password:", error);
        res.status(500).json({ error: "An error occurred. Please try again." });
    }
}
