// @/components/DummyPage.js
import Head from 'next/head';
import Layout from '../Layout';
import pholder from '@/img/placeholder-learn.png';
import learn from '@/img/learn.png';
import { FaArrowRight } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import gradient1 from '@/img/gradient-1.png'
import gradient2 from '@/img/gradient-2half.png'
import React, {useState } from 'react';

const Card = ({ children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{
                ...styles.card,
                ...(isHovered ? styles.cardHover : {})
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </div>
    );
};



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
        <Layout pageTitle="Learn">
            <Head>
            </Head>
            <div style={styles.pageContainer}>
                <div style={styles.mainContainer}>
                    <div style={styles.heroContainer}>
                        <div style={styles.contentContainer}>
                            <h1 style={styles.title}>Login Now to <br />Learn <br /> Crypto Trading</h1>
                        </div>
                        <div style={styles.imageContainer}>
                            <img src={learn.src} style={styles.image} />
                        </div>
                    </div>

                    <div style={styles.gradient1}></div>
                    <div style={styles.gradient2}></div>

                    <div style={styles.coursesContainer}>
                        <div style={styles.coursesHeader}>
                            <h1 style={styles.sectionTitle}>Popular Courses</h1>
                            <h1 style={styles.sectionText}>See all <span style={styles.arrow}>→</span></h1>
                        </div>

                        <div style={styles.cardGrid}>
                        <Card>
                            <div style={styles.cardLeft}>
                                <img src={pholder.src} style={styles.courseImage}></img>
                            </div>
                            <div style={styles.cardRight}>
                                <h1 style={styles.cardTitle}>Course Title</h1>
                                <p style={styles.cardDesc}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <button style={styles.cardButton}>Learn<FaPlay style={styles.playIcon}/></button>
                            </div>
                        </Card>

                        <Card>
                            <div style={styles.cardLeft}>
                                <img src={pholder.src} style={styles.courseImage}></img>
                            </div>
                            <div style={styles.cardRight}>
                                <h1 style={styles.cardTitle}>Course Title</h1>
                                <p style={styles.cardDesc}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <button style={styles.cardButton}>Learn<FaPlay style={styles.playIcon}/></button>
                            </div>
                        </Card>

                        <Card>
                            <div style={styles.cardLeft}>
                                <img src={pholder.src} style={styles.courseImage}></img>
                            </div>
                            <div style={styles.cardRight}>
                                <h1 style={styles.cardTitle}>Course Title</h1>
                                <p style={styles.cardDesc}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <button style={styles.cardButton}>Learn<FaPlay style={styles.playIcon}/></button>
                            </div>
                        </Card>

                        <Card>
                            <div style={styles.cardLeft}>
                                <img src={pholder.src} style={styles.courseImage}></img>
                            </div>
                            <div style={styles.cardRight}>
                                <h1 style={styles.cardTitle}>Course Title</h1>
                                <p style={styles.cardDesc}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <button style={styles.cardButton}>Learn<FaPlay style={styles.playIcon}/></button>
                            </div>
                        </Card>

                        <Card>
                            <div style={styles.cardLeft}>
                                <img src={pholder.src} style={styles.courseImage}></img>
                            </div>
                            <div style={styles.cardRight}>
                                <h1 style={styles.cardTitle}>Course Title</h1>
                                <p style={styles.cardDesc}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <button style={styles.cardButton}>Learn<FaPlay style={styles.playIcon}/></button>
                            </div>
                        </Card>


                        <Card>
                            <div style={styles.cardLeft}>
                                <img src={pholder.src} style={styles.courseImage}></img>
                            </div>
                            <div style={styles.cardRight}>
                                <h1 style={styles.cardTitle}>Course Title</h1>
                                <p style={styles.cardDesc}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <button style={styles.cardButton}>Learn<FaPlay style={styles.playIcon}/></button>
                            </div>
                        </Card>


                        

                        
                        </div>
                    </div>
                </div>


            </div>
        </Layout>
    );
}

const styles = {
    pageContainer: {
        position: 'relative',
        overflow: 'hidden', // Prevents page from extending too far
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '6rem',
    },
    heroContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '0 20px',
        fontFamily: "'Sora', sans-serif",
    },
    coursesContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: '6rem',  // Adjust alignment here
        padding: '20px',
        maxWidth: '80%',
        minHeight: '60vh', // Added this to make sure it doesn't stretch too far
    },
    cardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // Creates 3 columns
        gridGap: '20px', // Space between the cards
        alignItems: 'center',
        justifyContent: 'center',
    },
    coursesHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
    },
    sectionTitle: {
        fontFamily: 'Sora',
        fontSize: '35px',
        fontWeight: '700',
        margin: 0,
    },
    sectionText: {
        fontFamily: 'Sora',
        fontSize: '20px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer', 
    },
    arrow: {
        marginLeft: '8px',  // Add space between "See all" and arrow
        fontSize: '20px',
    },

    card: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '30px',
        margin: '1%',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        overflow: 'hidden', // Prevent overflow
        Width: '750px', // Set a max width for the card
        height: '300px', // Allow the card height to adjust
    },
    cardLeft: {
        flex: '1 1 40%',      
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',      // Adds some padding for spacing
    },
    cardRight: {
        flex: '1 1 60%', // Set the right part to take up 60% of the card
        display: 'flex',
        flexDirection: 'column',
        padding: '20px', // Add padding for better content spacing
        justifyContent: 'center', // Center content vertically
    },
    cardTitle: {
        color: '#fff', // Use 'color' instead of 'Color'
        fontSize: '25px',
        fontFamily: "'Sora', sans-serif",
        fontWeight: '800',
        marginRight: 'auto',
       
    }, cardTitle: {
        color: '#fff',
        fontSize: '20px', // Adjust font size
        fontFamily: "'Sora', sans-serif",
        fontWeight: '800',
        marginBottom: '10px', // Add margin between title and description
    },
    cardDesc: {
        color: '#fff',
        fontSize: '15px',
        fontFamily: "'Sora', sans-serif",
        textAlign: 'justify',
        marginBottom: '20px', // Add some space before the button
        lineHeight: '1.5', // Increase line height for better readability
    },
    cardButton: {
        backgroundColor: 'white',
        color: '#0B162B',
        fontFamily: 'Sora',
        fontWeight: '900',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        alignSelf: 'center',
        marginTop: 'auto',
        width: '120px', // Adjusted width for space
        display: 'flex',
        alignItems: 'center', // Align items horizontally
        justifyContent: 'center', // Center the content
    },
    playIcon: {
    marginLeft: '8px', // Add some space between the text and the icon
    fontSize: '14px', // Adjust the size of the icon
    },
    icon: {
        fontSize: '30px', // Adjust size as needed
        color: '#fff', // Icon color
    },
    cardHover: {
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)', // Glow effect
        transform: 'scale(1.05)', // Slight expansion effect
    },

    gradient1: {
        position: 'absolute',
        top: '1%', // Adjusted to keep it aligned without pushing content down
        left: '-20%',
        width: '70%',
        height: '100%',
        backgroundImage: `url(${gradient1.src})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
        zIndex: -1, 
    },
    gradient2: {
        position: 'absolute',
        top: '30%', // Adjusted to avoid pushing content down
        right: '0%',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${gradient2.src})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        zIndex: -1,
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
        minWidth: '50%',  
        minHeight: '50%', 
    },
    courseImage: {
        width: '100%',        // Ensures the image takes up the full width of its container
        height: '100%',       // Maintains the image's aspect ratio
        objectFit: 'cover',   // Ensures the image covers the container without stretching
        maxWidth: '200px',    // Sets a maximum width for the image inside the card
        maxHeight: '200px',   // Sets a maximum height for the image inside the card
        borderRadius: '20px', // Optional: Adds rounded corners to the image

    },
    
    contentContainer: {
        flex: 1,
        paddingLeft: '40px',
    },
    title: {
        fontSize: '4rem',
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

