import Head from 'next/head';
import Layout from '../Layout'
import gradient1 from '@/img/gradient-1.png';
import forgoticon from '@/img/forgoticon.png';
import { FaUser } from "react-icons/fa";
import React, {useState } from 'react';





export default function DummyPage({ title }) {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
        console.log('Email submitted:', email);
    };


    return(
        <Layout
            pageTitle={title}
        >

            <div style={styles.pageContainer}>
            <div style={styles.gradient1}></div>
                
            <div style={styles.leftPanel}>
                <h1 style={styles.header1}>Forgot your Password?</h1>
                <p style={styles.body1}>Enter your registered e-mail address and we will send a link to reset your password.</p>
                <form onSubmit={handleSubmit} style={styles.form}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            style={styles.emailInput}
                            required
                        />
                        <button type="submit" style={styles.submitButton}>Submit</button>
                    </form>
                </div>
                <img src={forgoticon.src} style={styles.image}/>
            </div>
            


        </Layout>
    )
}

const styles={

    pageContainer:{
        display:'flex',
        flexDirection:'row',
        marginLeft: '2rem',
        marginTop: '5rem',
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

    leftPanel:{
        height: '500px',
        width: '800px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: '20px',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },

        header1:{
            fontFamily: 'Sora',
            fontSize: '50px',
            fontWeight: '900',
            marginBottom: '10px',
        },

        body1:{
            fontFamily: 'Sora',
            fontSize: '18px',
            fontWeight: '500',
            marginBottom: '50px',
        },

        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    
        emailInput: {
            fontSize: '16px',
            fontFamily: 'Sora',
            padding: '10px',
            width: '500px',
            border: '1px solid #ccc',
            borderRadius: '20px',
            marginBottom: '20px',
            color: 'black',
        },
    
        submitButton: {
            fontSize: '16px',
            fontFamily: 'Sora',
            fontWeight: '700',
            padding: '10px 20px',
            backgroundColor: '#F4594E',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            height: '50px',
            width: '150px',
        },
    
        submitButtonHover: {
            backgroundColor: '#1a2a3b',
        },

        image: {
            maxWidth: '500px',
            height: '500px',
            marginLeft: '30px',
            justifyContent: 'center',
            alignItems: 'center',
        },

};