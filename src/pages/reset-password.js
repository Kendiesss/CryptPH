// pages/reset-password.js
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function ResetPassword() {
    const router = useRouter();
    const { token } = router.query; // Get the token from the URL
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }), // Send plain token and new password
            });

            const data = await res.json();
            if (res.ok) {
                setSuccessMessage("Password reset successful. Redirecting to login...");
                // Wait for a short delay, then redirect
                setTimeout(() => router.push('/Login'), 2000); // Use hardcoded redirect to /login
            } else {
                setErrorMessage(data.error || "Failed to reset password.");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}
