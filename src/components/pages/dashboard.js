// @/components/dashboard.js

import Head from 'next/head';
import Layout from '../Layout';
import styles from '@/styles/dashboard.module.css';
import logo from '@/img/logo.png';
import hero2 from '@/img/hero2.png';
import maya from '@/img/maya2.png';
import gcrypto from '@/img/gcrypto2.png';
import coinsph from '@/img/coinsph2.png';
import gradient1 from '@/img/gradient-1.png'
import gradient2 from '@/img/gradient-2half.png'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HeroPage() {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const [user, setUser] = useState(null); // Track logged-in user info
    const [showSignOut, setShowSignOut] = useState(false);

    // Retrieve user info from local storage on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwt_decode(token);
                setUser(decoded); // Assuming the token contains user info like the name
            } catch (error) {
                console.error("Failed to decode token:", error);
            }
        }
    }, []);

    const handleRegister = () => {
        router.push('/learn');
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null); // Clear user info
        router.push('/login'); // Redirect to login page
    };

    const glowStyle = {
        color: '#fff',
        fontSize: '5rem',
        fontWeight: 'bold',
        position: 'relative',
        transition: 'text-shadow 0.3s ease-in-out',
        textShadow: isHovered
            ? '0 0 1px white, 0 0 10px white, 0 0 15px white'
            : 'none',
    };

    return (
        <Layout pageTitle="Home">
            <Head></Head>
            <div className={styles.pageContainer}>
                <img src={logo.src} className={styles.logo} />
                <div className={styles.heroContainer}>
                    <div className={styles.imageContainer}>
                        <img src={hero2.src} className={styles.image} />
                    </div>
                    <div className={styles.contentContainer}>
                        <h1 className={styles.title}>Welcome to CryptPH</h1>
                        <p className={styles.subtitle}>
                            your one-stop platform for mastering cryptocurrency trading with <b>cryptocurrency</b> data, <b>educational</b> content, and <b>accessible</b> tools.
                        </p>
                    </div>
                </div>

                <div className={styles.gradient1}>
                    <img src={gradient1.src} className="img-fluid" alt="Gradient 1" />
                </div>
                <div className={styles.gradient2}>
                    <img src={gradient2.src} className="img-fluid" alt="Gradient 2" />
                </div>

                <div className={styles.brandContainer}>
                    <img src={maya.src} className={styles.brands} />
                    <img src={gcrypto.src} className={styles.brands} />
                    <img src={coinsph.src} className={styles.brands} />
                </div>
                <div className={styles.heroContainer2}>
                    <div className={styles.contentContainer}>
                        <h1 className={styles.title2}>Login now to <br /> Learn <br />
                            <span
                                style={glowStyle}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >Crypto Trading.</span>
                        </h1>
                        <button
                            className={styles.ctaButton}
                            onClick={handleRegister}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            Register Now
                        </button>
                        {!user ? (
                            <h1 className={styles.signInLink}>Have an Existing Account? <a href="/Login" className={styles.link}><u>Click here</u> </a> to sign in.</h1>
                        ) : (
                            <div className={styles.userContainer}>
                                <button
                                    className={styles.userButton}
                                    onClick={() => setShowSignOut(!showSignOut)}
                                >
                                    <span><FaUser /> {user.name}</span>
                                </button>
                                {showSignOut && (
                                    <button
                                        className={styles.signOutButton}
                                        onClick={handleSignOut}
                                    >
                                        Sign Out
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
