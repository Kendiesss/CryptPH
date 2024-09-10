// @/components/HeroPage.js

import Head from 'next/head';
import Link from 'next/link';
import Layout from '../Layout/adminIndex';
import gradient4 from '@/img/gradient-4.png'
import { FiUsers } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoNewspaperOutline } from "react-icons/io5";
import { HiOutlineTrendingUp } from "react-icons/hi";
import React, {useState } from 'react';
import Cursor from 'quill/blots/cursor';


const Card = ({ children, link }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={link}> 
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
        </Link>
    );
};



export default function HeroPage() {

    const handleRegister = () => {
        console.log('Register button clicked');
        window.location.href = '/learn';
      };
      const [isHovered, setIsHovered] = useState(false);

    return (
        <Layout pageTitle="Dashboard">
            <Head>
            </Head>

            
            <div style={styles.pageContainer}>
                    <div style={styles.gradient3}></div>
                <div style={styles.infoContainer}>

                </div>
                <div style={styles.cardsContainer}>

                <Card link={"/admin-dashboard"}>
                        <div style={styles.cardHeader}>
                            <h1 style={styles.cardTitle}>Dashboard</h1>
                            <AiOutlineDashboard style={styles.icon} />
                        </div>
                        <div style={styles.cardBody}>
                            <p style={styles.cardDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                </Card>


                <Card link={"/admin-dashboard"}>
                        <div style={styles.cardHeader}>
                            <h1 style={styles.cardTitle}>Users</h1>
                            <FiUsers style={styles.icon} />
                        </div>
                        <div style={styles.cardBody}>
                            <p style={styles.cardDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                </Card>

                <Card link={"/admin-dashboard"}>
                        <div style={styles.cardHeader}>
                            <h1 style={styles.cardTitle}>Profile</h1>
                            <FiUser style={styles.icon} />
                        </div>
                        <div style={styles.cardBody}>
                            <p style={styles.cardDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                </Card>

                <Card link={"/manageContents"}>
                        <div style={styles.cardHeader}>
                            <h1 style={styles.cardTitle}>Posts</h1>
                            <FaRegBookmark style={styles.icon} />
                        </div>
                        <div style={styles.cardBody}>
                            <p style={styles.cardDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                </Card>

                <Card link={"/news"}>
                        <div style={styles.cardHeader}>
                            <h1 style={styles.cardTitle}>News</h1>
                            <IoNewspaperOutline style={styles.icon} />
                        </div>
                        <div style={styles.cardBody}>
                            <p style={styles.cardDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                </Card>

                <Card link={"/charts"}>
                        <div style={styles.cardHeader}>
                            <h1 style={styles.cardTitle}>Charts</h1>
                            <HiOutlineTrendingUp style={styles.icon} />
                        </div>
                        <div style={styles.cardBody}>
                            <p style={styles.cardDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                </Card>

                </div>
            </div>
        </Layout>
    );
}

const styles = {

    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px', 
    },
    cardsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // Creates 3 columns
        gridGap: '20px', // Space between the cards
        alignItems: 'center',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0B162B',
        height: '300px', // Set a fixed height
        width: '400px',  // Set a fixed width
        borderRadius: '20px', 
        margin: '2%',
        border: '2px solid white', // Set a white border with specified thickness
        justifyContent: 'left',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        Cursor: 'pointer',
 
    },

    cardHeader:{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '5%',
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '10px', 
    },

    cardBody:{
        alignItems: 'center', // Vertically centers the icon and title
        justifyContent: 'space-between', // Creates space between title and icon
        padding: '10px', // Adjust padding as needed
    },
    cardTitle: {
        color: '#fff', // Use 'color' instead of 'Color'
        fontSize: '30px',
        fontFamily: "'Sora', sans-serif",
        fontWeight: '800',
        marginRight: 'auto',
       
    },
    cardDesc:{
        color: '#fff', // Use 'color' instead of 'Color'
        fontSize: '15px',
        fontFamily: "'Sora', sans-serif",
        textAlign: 'justify',
        marginRight: '10px', 
    },
    icon: {
        fontSize: '30px', // Adjust size as needed
        color: '#fff', // Icon color
        
    },
    cardHover: {
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)', // Glow effect
        transform: 'scale(1.05)', // Slight expansion effect
    },
    gradient3: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${gradient4.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
        zIndex: -1, // Ensure it’s behind the main content
        xIndex: -10,
    },
};
