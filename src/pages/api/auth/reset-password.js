// pages/api/auth/reset-password.js
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    await dbConnect();

    const { token, password } = req.body;

    try {
        // Find user by reset token and check if token has not expired
        const user = await User.findOne({
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: "User not found or token expired" });
        }

        // Verify that the plain token matches the hashed token stored in the database
        const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
        if (!isTokenValid) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update the user with the new password and clear the reset token fields
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        // Respond with success and provide redirect information
        res.status(200).json({ message: "Password reset successful", redirect: "/" });
    } catch (error) {
        console.error("Error in reset password:", error);
        res.status(500).json({ error: "An error occurred. Please try again." });
    }
}
