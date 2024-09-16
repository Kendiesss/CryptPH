// @/components/DummyPage.js
import Head from 'next/head';
import Layout from '../Layout'
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineChatBubble } from "react-icons/md";
import React, {useState } from 'react';

const coinData = [
    { icon: '🪙', name: 'BTC' },
    { icon: '🟢', name: 'ETH' },
    { icon: '🟡', name: 'BIN' },
    // add coins more here
];

export default function DummyPage({ title }) {

    return (
        <Layout
            pageTitle={title}
        >
            <div style={styles.pageContainer}>
                
                <div style={styles.leftPanel}>
                    <div style={styles.dropDownGroup}>
                        <select style={styles.dropdown}>
                                {coinData.map((coin, index) => (
                                    <option key={index} value={coin.name}>
                                        {coin.icon} {coin.name}
                                    </option>
                                ))}
                        </select>
                        <div style={styles.cryptoDataGroup}>
                            <h1 style={styles.cryptoData1}>&#x20B1;3,852,578</h1>
                            <h1 style={styles.cryptoData2}><span style={styles.arrowIcon}><IoMdArrowDropdown /></span> 3.2%</h1>
                        </div>
                    </div>
                    <h1 style={styles.header1}>Latest News in CryptPH</h1>
                    <div style={styles.newsCardContainer}>

                        <div style={styles.newsCard}>
                            <h1 style={styles.newsHeader}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit placerat leo sit amet sollicitudin. Sed id lectus auctor orci facilisis commodo.</h1>
                            <p style={styles.p1}>10 days ago</p>
                        </div>

                        <div style={styles.newsCard}>
                            <h1 style={styles.newsHeader}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit placerat leo sit amet sollicitudin. Sed id lectus auctor orci facilisis commodo.</h1>
                            <p style={styles.p1}>10 days ago</p>
                        </div>

                        <div style={styles.newsCard}>
                            <h1 style={styles.newsHeader}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit placerat leo sit amet sollicitudin. Sed id lectus auctor orci facilisis commodo.</h1>
                            <p style={styles.p1}>10 days ago</p>
                        </div>

                        <div style={styles.newsCard}>
                            <h1 style={styles.newsHeader}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit placerat leo sit amet sollicitudin. Sed id lectus auctor orci facilisis commodo.</h1>
                            <p style={styles.p1}>10 days ago</p>
                        </div>

                        <div style={styles.newsCard}>
                            <h1 style={styles.newsHeader}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit placerat leo sit amet sollicitudin. Sed id lectus auctor orci facilisis commodo.</h1>
                            <p style={styles.p1}>10 days ago</p>
                        </div>

                    </div>
                </div>

                <div style={styles.rightPanel}>

                    <div style={styles.chartContainer}>
                            <h1>CHARTS</h1>
                    </div>
                    <div style={styles.historicalDataContainer}>

                            <div style={styles.hdataCard}>
                                <h1 style={styles.header3}>1h</h1>
                                <h1 style={styles.cryptoData2}><span style={styles.arrowIcon}><IoMdArrowDropdown /></span> 0.0%</h1>
                            </div>

                            <div style={styles.hdataCard}>
                                <h1 style={styles.header3}>24h</h1>
                                <h1 style={styles.cryptoData2}><span style={styles.arrowIcon}><IoMdArrowDropdown /></span> 0.0%</h1>
                            </div>

                            <div style={styles.hdataCard}>
                                <h1 style={styles.header3}>7d</h1>
                                <h1 style={styles.cryptoData2}><span style={styles.arrowIcon}><IoMdArrowDropdown /></span> 0.0%</h1>
                            </div>

                            <div style={styles.hdataCard}>
                                <h1 style={styles.header3}>14d</h1>
                                <h1 style={styles.cryptoData2}><span style={styles.arrowIcon}><IoMdArrowDropdown /></span> 0.0%</h1>
                            </div>

                            <div style={styles.hdataCard}>
                                <h1 style={styles.header3}>30d</h1>
                                <h1 style={styles.cryptoData2}><span style={styles.arrowIcon}><IoMdArrowDropdown /></span> 0.0%</h1>
                            </div>

                            <div style={styles.hdataCard}>
                                <h1 style={styles.header3}>1yr</h1>
                                <h1 style={styles.cryptoData2}><span style={styles.arrowIcon}><IoMdArrowDropdown /></span> 0.0%</h1>
                            </div>
                    </div>
                    <div style={styles.faqSection}>
                        <h1 style={styles.header2}>
                            Frequently Asked Questions (FAQ)
                            <span style={styles.icon}><MdOutlineChatBubble/></span>
                        </h1>
                            <div style={styles.faqCardContainer}>
                                
                                <div style={styles.faqCards}>
                                    <h1 style={styles.faqHeader}>What is CryptPH?</h1>
                                    <p style={styles.p2}>Lorem ipsum odor amet, consectetuer adipiscing elit. Commodo at penatibus dictumst adipiscing orci ridiculus nunc. Cursus vulputate fringilla in elit aliquet condimentum. Primis ligula penatibus platea; placerat enim feugiat accumsan accumsan. Arcu ultrices in nisi odio lorem habitasse tincidunt at. Lobortis volutpat vehicula volutpat sodales pellentesque ad adipiscing vulputate.</p>
                                </div>

                                <div style={styles.faqCards}>
                                    <h1 style={styles.faqHeader}>Who are CryptPH's Developers?</h1>
                                    <p style={styles.p2}>Lorem ipsum odor amet, consectetuer adipiscing elit. Commodo at penatibus dictumst adipiscing orci ridiculus nunc. Cursus vulputate fringilla in elit aliquet condimentum. Primis ligula penatibus platea; placerat enim feugiat accumsan accumsan. Arcu ultrices in nisi odio lorem habitasse tincidunt at. Lobortis volutpat vehicula volutpat sodales pellentesque ad adipiscing vulputate.</p>
                                </div>

                                <div style={styles.faqCards}>
                                    <h1 style={styles.faqHeader}>How to use CryptPH's Virtual Trading Game?</h1>
                                    <p style={styles.p2}>Lorem ipsum odor amet, consectetuer adipiscing elit. Commodo at penatibus dictumst adipiscing orci ridiculus nunc. Cursus vulputate fringilla in elit aliquet condimentum. Primis ligula penatibus platea; placerat enim feugiat accumsan accumsan. Arcu ultrices in nisi odio lorem habitasse tincidunt at. Lobortis volutpat vehicula volutpat sodales pellentesque ad adipiscing vulputate.</p>
                                </div>

                                <div style={styles.faqCards}>
                                    <h1 style={styles.faqHeader}>How to Register for an Account?</h1>
                                    <p style={styles.p2}>Lorem ipsum odor amet, consectetuer adipiscing elit. Commodo at penatibus dictumst adipiscing orci ridiculus nunc. Cursus vulputate fringilla in elit aliquet condimentum. Primis ligula penatibus platea; placerat enim feugiat accumsan accumsan. Arcu ultrices in nisi odio lorem habitasse tincidunt at. Lobortis volutpat vehicula volutpat sodales pellentesque ad adipiscing vulputate.</p>
                                </div>
                            </div>
                    </div>
            
                </div>


            </div>
        </Layout>
    
    )

}

const styles = {

pageContainer:{
    marginLeft: '5rem',
    marginTop: '3rem',
    height: 'auto',
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
},

    leftPanel:{
        display: 'flex',
        flexDirection: 'column',
        height: '1500px',
        width: '350px',
        borderRight: '1px solid white',
        padding: '20px',
    },

        dropDownGroup: {
            marginBottom: '1rem',
            border: '1px solid white',
            borderBottom: '1px solid white',
            borderRadius: '10px',
        },
            dropdown: {
                width: '100%',
                padding: '10px',
                fontFamily: 'Sora',
                fontWeight: '600',
                fontSize: '16px',
                backgroundColor: 'white',
                color:'#0B162B',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginBottom: '1rem',
            },
        cryptoDataGroup: {
            marginBottom: '1rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '5px',
        },
            cryptoData1: {
                fontFamily: 'Sora',
                fontSize: '20px',
                fontWeight: '700',
            },
            cryptoData2: {
                fontFamily: 'Sora',
                fontSize: '20px',
                fontWeight: '700',
                color: 'red',
                display: 'flex', // Use flex to ensure the icon and text are aligned
                alignItems: 'center',
            },
            arrowIcon: {
                marginRight: '5px',
                color: 'red',  // Space between the icon and percentage text
            },
        
        header1: {
            marginBottom: '1rem',
            fontFamily: 'Sora',
            fontSize: '20px',
            fontWeight: '700',
        },

        newsCardContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: 'auto',
            marginBottom: 'auto',
            overflowY: 'auto',
            
        },

            newsCard:{
                marginBottom: '1rem',
                marginRight: '1rem',
                border: '1px solid white',
                borderRadius : '10px',
                padding: '5px',
                height: '235px',
                width: '90%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left',
                textAlign: 'left',
                background: 'rgb(21,44,88)',
                background: 'linear-gradient(150deg, rgba(21,44,88,1) 0%, rgba(11,22,43,1) 72%)',
                
            },

            newsHeader:{
                fontFamily: 'Sora',
                fontSize: '16px',
                fontWeight: '500',
                marginTop: '1rem',
                marginBottom: '1rem',
                color: 'white',
            },

            p1:{
                fontFamily: 'Sora',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '1rem',
                color: '#0B162B',
                backgroundColor: 'white',
                borderRadius: '30px',
                textAlign: 'center',
                padding: '1px',
                width: '100px',
            },
    
    rightPanel:{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '3rem',
    },

        chartContainer:{
            justifyContent:'center',
            height: '600px',
            width: '1000px',
            border: '1px solid white',
            borderBottom: '1px solid white',
            marginBottom: '1rem',
        },

        historicalDataContainer:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent:'center',
            height: '100px',
            width: '1000px',
            marginBottom: '1rem',
            padding: '5px',
        },

            hdataCard:{
                display:'flex',
                flexDirection:'column',
                height: '80px',
                width: '150px',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid white',
                borderRadius: '20px',
                padding: '10px',
                margin: '10px',
                
            },

                header3:{
                    fontFamily: 'Sora',
                    fontSize: '16px',
                    fontWeight: '700',
                },


        faqSection:{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '3rem',
            height: '500px',
            width: '1000px',
        },

            header2: {
                backgroundColor: 'white',
                color: '#0B162B',
                fontFamily: 'Sora',
                fontSize: '25px',
                fontWeight: '900',
                display: 'flex',   
                flexDirection: 'row',    
                alignItems: 'center',  
                justifyContent: 'space-between',
                borderRadius: '50px',
                height: '40px',
                padding: '10px',
                marginBottom: '30px',
            },
            icon: {
                color: 'white',
                marginLeft: '10px',    // Adds space between the text and the icon
                fontSize: '50px',   // Adjust icon size (if necessary)
                borderRadius: '50px',
                border: '3px solid white',
                padding:'10px',
                background: 'rgb(21,44,88)',
                background: 'linear-gradient(150deg, rgba(21,44,88,1) 0%, rgba(11,22,43,1) 72%)',
            },
            
            faqCards:{
                width: '1000px',
                height:'150px',
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '1rem',
                justifyContent: 'left',
            },

                faqHeader:{
                    fontFamily: 'Sora',
                    fontSize: '20px',
                    fontWeight: '900',
                    textAlign: 'left',
                    marginBottom: '0.5rem',
                },

                p2:{
                    fontFamily: 'Sora',
                    fontSize: '16px',
                    fontWeight: '500',
                    textAlign: 'left',
                }
            
};
