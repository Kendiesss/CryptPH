// @/components/HeroPage.js

import Head from 'next/head';
import Layout from '../Layout';
import styles from '@/styles/dashboard.module.css'; // Importing CSS module
import logo from '@/img/logo.png';
import hero2 from '@/img/hero2.png';
import maya from '@/img/maya2.png';
import gcrypto from '@/img/gcrypto2.png';
import coinsph from '@/img/coinsph2.png';
import gradient1 from '@/img/gradient-1.png'
import gradient2 from '@/img/gradient-2half.png'
import React, {useState } from 'react';

export default function HeroPage() {
    const handleRegister = () => {
        console.log('Register button clicked');
        window.location.href = '/learn';
    };

    const [isHovered, setIsHovered] = useState(false);

    const glowStyle = {
        color: '#fff', // Base text color
        fontSize: '5rem',
        fontWeight: 'bold',
        position: 'relative',
        transition: 'text-shadow 0.3s ease-in-out',
        textShadow: isHovered 
        ? '0 0 1px white, 0 0 10px white, 0 0 15px white' // Reduced glow effect
        : 'none',
    };

    return (
        <Layout pageTitle="Home">
            <Head>
                {/* <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
                <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" rel="stylesheet"/> */}
            </Head>
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
                    </div>
                </div>
            </div>
        </Layout>
    );
}
