// @/components/HeroPage.js

import Head from 'next/head';
import Layout from '../Layout';
import logo from '@/img/logo.png';
import hero2 from '@/img/hero2.png';
import hero from '@/img/hero.jpg';
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
            <div style={styles.pageContainer}>
            <img src={logo.src} style={styles.logo}/>
            <div style={styles.heroContainer}>
                <div style={styles.imageContainer}>
                    <img src={hero2.src} style={styles.image}/>
                </div>
                <div style={styles.contentContainer}>
                    <h1 style={styles.title}>Welcome to CryptPH</h1>
                    <p style={styles.subtitle}>
                    your one-stop platform for mastering cryptocurrency trading with <b>cryptocurrency</b> data, <b>educational</b> content, and <b>Accessible</b> tools.
                    </p>
                </div>
            </div>

            <div style={styles.gradient1}></div>
            <div style={styles.gradient2}></div>
            
            <div style={styles.brandContainer}>
                <img src={maya.src} style={styles.brands}/>
                <img src={gcrypto.src} style={styles.brands}/>
                <img src={coinsph.src} style={styles.brands}/>

            </div>
            <div style={styles.heroContainer2}>
                <div style={styles.contentContainer}>
                    <h1 style={styles.title2}>Login now to <br /> Learn <br />
                    <span 
                                style={glowStyle}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                    >Crypto Trading.</span></h1>
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
        fontFamily: "'Sora', sans-serif",
    },
    heroContainer2: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '0 20px',
        fontFamily: "'Sora', sans-serif",
        marginLeft: '5%',
        position: 'relative', 
    },
    gradient1: {
        position: 'absolute',
        top: '60%',
        left: '-20%',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${gradient1.src})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
        zIndex: -1, // Ensure it’s behind the main content
        xIndex: -10,
    },
    gradient2: {
        position: 'absolute',  // Use fixed to keep it relative to the viewport
        top: '150%',          // Align it to the top of the viewport
        right: '0%',        // Align it to the right of the viewport
        width: '100%',    // Adjust width as needed
        height: '100%',   // Adjust height as needed
        backgroundImage: `url(${gradient2.src})`,
        backgroundSize: 'contain',  // Cover ensures the image covers the area
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',  // Center the image in the area
        zIndex: -1,        // Ensure it’s behind the main content
    },
 
    imageContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px', 
    },
    image: {
        maxWidth: '80%',
        height: 'auto',
        // borderRadius: '20px',
        // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        minWidth: '80%',  // Adjust this value as needed
        minHeight: '80%', // Adjust this value as neededS
    },
    contentContainer: {
        flex: 1,
        paddingLeft: '40px',
    },
    title: {
        fontSize: '3rem',
        fontWeight: 'Bold',
        marginBottom: '20px',
    },
    title2: {
        fontSize: '5rem',
        fontWeight: 'Bold',
        marginBottom: '50px',
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
        maxWidth: '20%',
        height: 'auto',
        marginRight:'auto',
        marginLeft:'auto',
        marginTop:'1%',
        marginBottom:'1%',
    },
    brandContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50px', 
        backgroundColor: 'rgba(64, 64, 64, 0.2)', 
        maxWidth: '80%',
        height: 'auto',
        margin: 'auto',
        padding: '20px 0',
    },
    centerContent: {
        flexDirection: 'column', // Stack title and button vertically
        textAlign: 'center',
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
        maxWidth: '50rem',  // Maximum width
        maxHeight: '6rem',  // Maximum height
    },
    ctaButtonHover: {
        backgroundColor: '#0B162B', 
      }
      
};
