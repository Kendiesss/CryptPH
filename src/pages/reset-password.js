// pages/reset-password.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from '@/styles/reset-password.module.css';

export default function ResetPassword() {
    const router = useRouter();
    const { token } = router.query;
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
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();
            if (res.ok) {
                setSuccessMessage("Password reset successful. Redirecting to login...");
                setTimeout(() => {
                    router.push(data.redirect);
                }, 2000);
            } else {
                setErrorMessage(data.error || "Failed to reset password.");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
            <div className={styles.pageContainer}>
                <div className={styles.leftPanel}>
                    <h1 className={styles.header1}>Reset your Password</h1>
                    <p className={styles.body1}>
                        Enter your new password below and confirm it.
                    </p>

                    {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New Password"
                            className={styles.input}
                            required
                        />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm New Password"
                            className={styles.input}
                            required
                        />
                        <button type="submit" className={styles.submitButton}>Reset Password</button>
                    </form>
                </div>
            </div>
    );
}
