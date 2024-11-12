// pages/forgot-password.js
import React, { useState } from 'react';
import Layout from '../Layout';
import gradient1 from '@/img/gradient-1.png';
import forgoticon from '@/img/forgoticon.png';
import styles from '@/styles/forgotPwd.module.css';

export default function ForgotPasswordPage({ title }) {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccessMessage("A password reset link has been sent to your email.");
                setEmail('');
            } else {
                setErrorMessage(data.error || "Failed to send password reset email.");
            }
        } catch (error) {
            console.error('Error sending password reset email:', error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <Layout pageTitle={title || "Forgot Password"}>
            <div className={styles.pageContainer}>
                <div className={styles.gradient1}></div>

                <div className={styles.leftPanel}>
                    <h1 className={styles.header1}>Forgot your Password?</h1>
                    <p className={styles.body1}>
                        Enter your registered e-mail address and we will send a link to reset your password.
                    </p>

                    {/* Display success or error message */}
                    {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className={styles.emailInput}
                            required
                        />
                        <button type="submit" className={styles.submitButton}>Submit</button>
                    </form>
                </div>

                <img src={forgoticon.src} alt="Forgot Password Icon" className={styles.image} />
            </div>
        </Layout>
    );
}
