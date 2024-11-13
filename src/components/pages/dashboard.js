// @/components/dashboard.js

import Head from 'next/head';
import jwt from 'jsonwebtoken';
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

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token found:", token); // Debug: Check if token is retrieved
    
        if (token) {
          try {
            const decoded = jwt.decode(token); // Use jwt.decode() to decode without verification
            setUser(decoded); // Set user from decoded token payload
          } catch (error) {
            console.error("Error decoding token:", error); // Log decoding errors
          }
        }
      }, []);

    const handleRegister = () => {
        router.push('/register');
    };

    const handleLearn = () => {
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
                        {!user ? (
                        <button
                            className={styles.ctaButton}
                            onClick={handleRegister}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            Register Now
                        </button>
                         ) : (
                            <button
                            className={styles.ctaButton}
                            onClick={handleLearn}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            Start Learning
                        </button>
                         )}
                        {!user ? (
                            <h1 className={styles.signInLink}>Have an Existing Account? <a href="/Login" className={styles.link}><u>Click here</u> </a> to sign in.</h1>
                        ) : (
                            <h1 className={styles.signInLink}>Want to try our Virtual Trading? <a href="/virtual-trading" className={styles.link}><u>Click here.</u></a></h1>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
