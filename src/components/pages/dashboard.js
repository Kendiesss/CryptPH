// @/components/HeroPage.js

import Layout from '../Layout';
import logo from '@/img/logo.png';
import hero from '@/img/hero.jpg';
import maya from '@/img/maya.png';
import gcrypto from '@/img/gcrypto.png';
import coinsph from '@/img/coinsph.png';
import React, { useState } from 'react';


export default function HeroPage() {

    const handleRegister = () => {
        console.log('Register button clicked');
        window.location.href = '/learn';
      };
      const [isHovered, setIsHovered] = useState(false);
    
    

    return (
        
        <Layout pageTitle="Hero Page">
            <img src={logo.src} style={styles.logo}/>
            <div style={styles.heroContainer}>
                <div style={styles.imageContainer}>
                    <img src={hero.src} style={styles.image}/>
                </div>
                <div style={styles.contentContainer}>
                    <h1 style={styles.title}>Welcome to CryptPH</h1>
                    <p style={styles.subtitle}>
                        We provide the best solutions to help your business grow.
                    </p>
                </div>
            </div>
            <div style={styles.brandContainer}>
                <img src={maya.src} style={styles.brands}/>
                <img src={gcrypto.src} style={styles.brands}/>
                <img src={coinsph.src} style={styles.brands}/>
            </div>
            <div style={styles.heroContainer}>
                <div style={styles.contentContainer}>
                    <h1 style={styles.title}>Login now to Learn Trading</h1>
                    <button
      style={styles.ctaButton}
      onClick={handleRegister}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Register Now
    </button>

                </div>
            </div>
        </Layout>
    );
}

const styles = {
    heroContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '0 20px',
        fontFamily: "'Arial', sans-serif",
    },
    imageContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    contentContainer: {
        flex: 1,
        paddingLeft: '40px',
    },
    title: {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    subtitle: {
        fontSize: '1.5rem',
        marginBottom: '30px',
        lineHeight: '1.6',
    },
    logo: {
        maxWidth: '30%',
        height: 'auto',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    brands: {
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '30%',
    },
    brandContainer: {
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '50px', 
        backgroundColor: 'rgba(64, 64, 64, 0.2)', 
        maxWidth: '95%',
        height: 'auto',
    },
    ctaButton: {
        padding: '15px 30px',
        backgroundColor: '#fff',
        color: 'black',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        borderRadius: '10rem',
    },
    ctaButtonHover: {
        backgroundColor: '#0B162B', 
      }
};
