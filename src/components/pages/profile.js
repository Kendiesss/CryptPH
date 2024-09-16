import Head from 'next/head';
import Layout from '../Layout'
import gradient1 from '@/img/gradient-1.png';
import { FaUser } from "react-icons/fa";
import React, {useState } from 'react';


const EditProfileModal = ({ show, onClose, onSave }) => {
    const [userName, setUserName] = useState('');
    const [passwd, setpasswd] = useState('');
    const [image, setImage] = useState(null);
    if (!show) { 
        return null;
    }

    const handleSubmit = () => {
        const formData = {userName, passwd, image };
        onSave(formData);
        onClose();
    };
};


export default function DummyPage({ title }) {

    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);

    return(
        <Layout
            pageTitle={title}
        >

            <div style={styles.pageContainer}>
            <div style={styles.gradient1}></div>
                
                    <div style={styles.profileCard}>
                        <div style={styles.profilePhoto}>
                            <FaUser></FaUser>
                        </div>
                        <div style={styles.profileDetails}>
                            <h1 style={styles.userName}>UserName</h1>
                            <p style={styles.dateJoined}>Joined September 2024</p>
                           
                        </div>
                        <div style={styles.buttonGroup}>

                            <button
                                style={{
                                    ...styles.button1,
                                    ...(isHovered1 ? styles.button1Hover : {}),
                                }}
                                onMouseEnter={() => setIsHovered1(true)}
                                onMouseLeave={() => setIsHovered1(false)}
                                
                            >Edit Profile</button>

                            <button
                            style={{
                                ...styles.button1,
                                ...(isHovered2 ? styles.button1Hover : {}),
                            }}
                            onMouseEnter={() => setIsHovered2(true)}
                            onMouseLeave={() => setIsHovered2(false)}

                            >Report Bugs</button>

                        </div>
                    </div>
                
            </div>


        </Layout>
    )
}

const styles={

    pageContainer:{
        display:'flex',
        flexDirection:'column',
        marginLeft: '2rem',
        marginTop: '3rem',
        justifyContent: 'center',
        alignItems: 'center',
    },

    gradient1: {
        position: 'absolute',
        top: '30%', 
        left: '-35%',
        width: '70%',
        height: '125%',
        backgroundImage: `url(${gradient1.src})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
        zIndex: -1, 
    },

        profileCard:{
            display:'flex',
            flexDirection: 'row',
            justifyContent:'left',
            alignItems: 'center',
            border: '1px solid white',
            borderRadius: '20px',
            height: '400px',
            width: '1300px',
            backgroundColor: '#0B162B',
            padding: '20px',
            position: 'relative',
        },

            profilePhoto:{
                    height: '300px',
                    width: '300px',
                    borderRadius: '100%',
                    backgroundColor: 'white',
                    color: '#0B162B',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '200px',
                    margin: '40px',
                    
            },

            profileDetails:{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'left',
                
            },

                userName:{
                    fontFamily: 'Sora',
                    fontSize: '35px',
                    fontWeight: '900',
                },

                dateJoined:{
                    fontFamily: 'Sora',
                    fontSize: '15px',
                    fontWeight: '500',
                    color:'#4A4A5A',
                },

                buttonGroup: {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    position: 'absolute',  
                    bottom: '20px',        
                    right: '20px',
                    margin: '10px',
                },
                    button1:{
                        fontSize: '14px',
                        fontFamily: 'Sora',
                        fontWeight: '700',
                        color:'white',
                        width: '150px',
                        height: '35px',
                        border: '2px solid white',
                        borderRadius: '30px',
                        margin: '5px',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                    },

                    button1Hover: {
                        boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.8)', 
                        backgroundColor: 'white',
                        color: '#0B162B',
                        transform: 'scale(1.05)',
                    },


};