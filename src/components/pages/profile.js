import Head from 'next/head';
import Layout from '../Layout';
import gradient1 from '@/img/gradient-1.png';
import { FaUser } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import styles from '@/styles/profile.module.css';  // Import the CSS module
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';// Correct import

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

    const router = useRouter();
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const { data: session } = useSession();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
          try {
            const decoded = jwt.decode(token); // Use jwt.decode() to decode without verification
            setUser(decoded); // Set user from decoded token payload
          } catch (error) {
            console.error("Error decoding token:", error); // Log decoding errors
          }
        }
      }, []);


      const forgotpwd = () => {
        router.push('/forgotpassword'); // Redirect to /reset-password
        };

    return (
        <Layout pageTitle={title}>
            <div className={styles.pageContainer}>
                {/* <div 
                    className={styles.gradient1}
                    style={{ backgroundImage: `url(${gradient1.src})` }} // Background image as inline
                ></div> */}

                <div className={styles.profileCard}>
                    <div className={styles.profilePhoto}>
                    {session?.user?.image ? (
                    <img
                        src={session.user.image}
                        alt="User Profile"
                        className={{ ...styles.profilePhoto, width: '200px', height: '200px', borderRadius: '100px', }} // Adjust size here
                    />
                    ) : (
                        <FaUser></FaUser>
                    )}
                    </div>
                    <div className={styles.profileDetails}>
                        <h1 className={styles.userName}>{session?.user?.name || `${user?.fname} ${user?.lname}` || 'My Name'}</h1>
                        <p className={styles.dateJoined}>{session?.user?.role || user?.role || 'Role'} </p>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button
                            className={isHovered1 ? `${styles.button1} ${styles.button1Hover}` : styles.button1}
                            onMouseEnter={() => setIsHovered1(true)}
                            onMouseLeave={() => setIsHovered1(false)}
                            onClick={forgotpwd}
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
