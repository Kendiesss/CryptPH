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
        // Find user by reset token and check if it hasn't expired
        const user = await User.findOne({
            resetPasswordToken: { $exists: true },
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: "User not found or token expired" });
        }

        // Verify the token matches
        const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
        if (!isTokenValid) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        // Set the new password directly and let the `pre-save` hook handle hashing
        user.password = password;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ message: "Password reset successful", redirect: "/Login" });
    } catch (error) {
        console.error("Error in reset password:", error);
        res.status(500).json({ error: "An error occurred. Please try again." });
    }
}
