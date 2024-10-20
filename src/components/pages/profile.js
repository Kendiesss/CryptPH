import Head from 'next/head';
import Layout from '../Layout';
import gradient1 from '@/img/gradient-1.png';
import { FaUser } from "react-icons/fa";
import React, { useState } from 'react';
import styles from '@/styles/profile.module.css';  // Import the CSS module

const EditProfileModal = ({ show, onClose, onSave }) => {
    const [userName, setUserName] = useState('');
    const [passwd, setpasswd] = useState('');
    const [image, setImage] = useState(null);
    if (!show) { 
        return null;
    }

    const handleSubmit = () => {
        const formData = { userName, passwd, image };
        onSave(formData);
        onClose();
    };
};

export default function DummyPage({ title }) {

    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);

    return (
        <Layout pageTitle={title}>
            <div className={styles.pageContainer}>
                {/* <div 
                    className={styles.gradient1}
                    style={{ backgroundImage: `url(${gradient1.src})` }} // Background image as inline
                ></div> */}

                <div className={styles.profileCard}>
                    <div className={styles.profilePhoto}>
                        <FaUser></FaUser>
                    </div>
                    <div className={styles.profileDetails}>
                        <h1 className={styles.userName}>UserName</h1>
                        <p className={styles.dateJoined}>Joined September 2024</p>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button
                            className={isHovered1 ? `${styles.button1} ${styles.button1Hover}` : styles.button1}
                            onMouseEnter={() => setIsHovered1(true)}
                            onMouseLeave={() => setIsHovered1(false)}
                        >
                            Edit Profile
                        </button>

                        <button
                            className={isHovered2 ? `${styles.button1} ${styles.button1Hover}` : styles.button1}
                            onMouseEnter={() => setIsHovered2(true)}
                            onMouseLeave={() => setIsHovered2(false)}
                        >
                            Report Bugs
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
