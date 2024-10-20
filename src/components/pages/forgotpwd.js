import Head from 'next/head';
import Layout from '../Layout';
import gradient1 from '@/img/gradient-1.png';
import forgoticon from '@/img/forgoticon.png';
import { FaUser } from "react-icons/fa";
import React, { useState } from 'react';
import styles from '@/styles/forgotPwd.module.css'; // Import your styles

export default function DummyPage({ title }) {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
        console.log('Email submitted:', email);
    };

    return (
        <Layout pageTitle={title}>
            <div className={styles.pageContainer}>
                <div className={styles.gradient1}></div>

                <div className={styles.leftPanel}>
                    <h1 className={styles.header1}>Forgot your Password?</h1>
                    <p className={styles.body1}>
                        Enter your registered e-mail address and we will send a link to reset your password.
                    </p>
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
                <img src={forgoticon.src} className={styles.image} />
            </div>
        </Layout>
    );
}
