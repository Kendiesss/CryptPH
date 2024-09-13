import Head from 'next/head';
import Layout from '../Layout';
import { FaBitcoin } from "react-icons/fa";
import { IoMdTrendingDown } from "react-icons/io";
import gradient1 from '@/img/gradient-1.png';
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

const CoinCard = ({ children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{
                ...styles.CoinCard,
                ...(isHovered ? styles.CoinCardHover : {})
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </div>
    );
};


export default function DummyPage({ title }) {

    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false); //For Entry Button
    const [isHovered5, setIsHovered5] = useState(false); //For Exit Button

    return (
        <Layout
            pageTitle={title}
        >
           
           <div style={styles.pageContainer}>
           <div style={styles.gradient1}></div>
                <div style={styles.topContainer}>
                    <div style={styles.leftPanel}>
                            <h1 style={styles.titleHeader}>Virtual Trading</h1>
                        <div style={styles.topGroup}>
                            <div style={styles.dummyCashContainer}>
                                <h1 style={styles.header1}>Available Dummy Cash</h1>
                                <h1 style={styles.header2}>$100,000.00</h1>
                            </div>
                            <div style={styles.buttonGroup}>
                                <button
                                style={{
                                    ...styles.button1,
                                    ...(isHovered1 ? styles.button1Hover : {}),
                                }}
                                onMouseEnter={() => setIsHovered1(true)}
                                onMouseLeave={() => setIsHovered1(false)}
                                
                                >My Portfolio</button>

                                <button
                                style={{
                                    ...styles.button1,
                                    ...(isHovered2 ? styles.button1Hover : {}),
                                }}
                                onMouseEnter={() => setIsHovered2(true)}
                                onMouseLeave={() => setIsHovered2(false)}
                                
                                >Records</button>

                                <button
                                style={{
                                    ...styles.button1,
                                    ...(isHovered3 ? styles.button1Hover : {}),
                                }}
                                onMouseEnter={() => setIsHovered3(true)}
                                onMouseLeave={() => setIsHovered3(false)}
                                
                                >Order History</button>
                            </div>
                        </div>
                        <div style={styles.cardContainer}>

                            <Card>
                                <h1 style={styles.header3}>CRYPTO : Coin Name</h1>
                                <span style={styles.smallcard}>Long</span>
                                <FaBitcoin style={styles.coinPlaceHolder}></FaBitcoin>
                                <div style={styles.priceGroup}>
                                    <h1 style={styles.header2}>0.0</h1>
                                    <h1 style={styles.header1}>Average Price</h1>
                                </div>
                                <div style={styles.priceGroup}>
                                    <h1 style={styles.header2}>0.0</h1>
                                    <h1 style={styles.header1}>Total Cost</h1>
                                </div>
                                <div style={styles.profitGroup}>
                                    <span style={styles.smallcard2}><IoMdTrendingDown style={styles.trendingDown}></IoMdTrendingDown> -0.1</span>
                                    <h1 style={styles.header1}>Total Cost</h1>
                                </div>
                                <div style={styles.profitGroup}>
                                    <span style={styles.smallcard2}><IoMdTrendingDown style={styles.trendingDown}></IoMdTrendingDown> -0.1</span>
                                    <h1 style={styles.header1}>% Profit</h1>
                                </div>
                            </Card>

                            <Card>
                                <h1 style={styles.header3}>CRYPTO : Coin Name</h1>
                                <span style={styles.smallcard}>Long</span>
                                <FaBitcoin style={styles.coinPlaceHolder}></FaBitcoin>
                                <div style={styles.priceGroup}>
                                    <h1 style={styles.header2}>0.0</h1>
                                    <h1 style={styles.header1}>Average Price</h1>
                                </div>
                                <div style={styles.priceGroup}>
                                    <h1 style={styles.header2}>0.0</h1>
                                    <h1 style={styles.header1}>Total Cost</h1>
                                </div>
                                <div style={styles.profitGroup}>
                                    <span style={styles.smallcard2}><IoMdTrendingDown style={styles.trendingDown}></IoMdTrendingDown> -0.1</span>
                                    <h1 style={styles.header1}>Total Cost</h1>
                                </div>
                                <div style={styles.profitGroup}>
                                    <span style={styles.smallcard2}><IoMdTrendingDown style={styles.trendingDown}></IoMdTrendingDown> -0.1</span>
                                    <h1 style={styles.header1}>% Profit</h1>
                                </div>
                            </Card>

                            <Card>
                                <h1 style={styles.header3}>CRYPTO : Coin Name</h1>
                                <span style={styles.smallcard}>Long</span>
                                <FaBitcoin style={styles.coinPlaceHolder}></FaBitcoin>
                                <div style={styles.priceGroup}>
                                    <h1 style={styles.header2}>0.0</h1>
                                    <h1 style={styles.header1}>Average Price</h1>
                                </div>
                                <div style={styles.priceGroup}>
                                    <h1 style={styles.header2}>0.0</h1>
                                    <h1 style={styles.header1}>Total Cost</h1>
                                </div>
                                <div style={styles.profitGroup}>
                                    <span style={styles.smallcard2}><IoMdTrendingDown style={styles.trendingDown}></IoMdTrendingDown> -0.1</span>
                                    <h1 style={styles.header1}>Total Cost</h1>
                                </div>
                                <div style={styles.profitGroup}>
                                    <span style={styles.smallcard2}><IoMdTrendingDown style={styles.trendingDown}></IoMdTrendingDown> -0.1</span>
                                    <h1 style={styles.header1}>% Profit</h1>
                                </div>
                            </Card>

                        </div>
                    </div>
                    <div style={styles.rightCard}>
                        <div style={styles.upperGroup}>
                            <div style={styles.leftUpper}>
                                <h1 style={styles.header4}>0.00001</h1>
                                <h1 style={styles.header5}>Coin Name</h1>
                            </div>
                            <span style={styles.smallRightcard}><IoMdTrendingDown style={styles.trendingDown}></IoMdTrendingDown> -0.1</span>    
                        </div>
                        <div style={styles.middleGroup}>
                            <h1 style={styles.header2}>Trade Type</h1>

                            <div style={styles.radioGroup}>
                                <div style={styles.radioButtonContainer}>
                                    <label style={styles.radioButtonLabel}>
                                        <input type="radio" name="tradeType" value="LONG" style={styles.radioInput} />
                                        Long
                                    </label>
                                </div>

                                <div style={styles.radioButtonContainer}>
                                    <label style={styles.radioButtonLabel}>
                                        <input type="radio" name="tradeType" value="SHORT" style={styles.radioInput} />
                                        Short
                                    </label>
                                </div>

                            </div>

                            <div style={styles.cardButtonGroup}>
                                <button style={{
                                    ...styles.Button2,
                                    ...(isHovered4 ? styles.Button2Hover : {}),
                                }}
                                onMouseEnter={() => setIsHovered4(true)}
                                onMouseLeave={() => setIsHovered4(false)}>Entry</button>


                                 <button style={{
                                    ...styles.Button3,
                                    ...(isHovered5 ? styles.Button3Hover : {}),
                                }}
                                onMouseEnter={() => setIsHovered5(true)}
                                onMouseLeave={() => setIsHovered5(false)}>Exit</button>

                            </div>

                            <div style={styles.coinCardContainer}>

                                <CoinCard>
                                    <div style={styles.innerCoinCard}> 
                                        <h1 style={styles.header5}>Coin</h1> 
                                        <FaBitcoin style={styles.coinPlaceHolder}></FaBitcoin>
                                    </div>
                                    <div style={styles.innerCoinCard}>
                                    <h1 style={styles.header5}>0.000001</h1>
                                        <span style={styles.smallcard2}><IoMdTrendingDown style={styles.trendingDown}></IoMdTrendingDown> -0.1</span> 
                                    </div>
                                </CoinCard>

                                <CoinCard>
                                    <div style={styles.innerCoinCard}> 
                                        <h1 style={styles.header5}>Coin</h1> 
                                        <FaBitcoin style={styles.coinPlaceHolder}></FaBitcoin>
                                    </div>
                                    <div style={styles.innerCoinCard}>
                                    <h1 style={styles.header5}>0.000001</h1>
                                        <span style={styles.smallcard2}><IoMdTrendingDown style={styles.trendingDown}></IoMdTrendingDown> -0.1</span> 
                                    </div>
                                </CoinCard>

                                <CoinCard>
                                    <div style={styles.innerCoinCard}> 
                                        <h1 style={styles.header5}>Coin</h1> 
                                        <FaBitcoin style={styles.coinPlaceHolder}></FaBitcoin>
                                    </div>
                                    <div style={styles.innerCoinCard}>
                                    <h1 style={styles.header5}>0.000001</h1>
                                        <span style={styles.smallcard2}><IoMdTrendingDown style={styles.trendingDown}></IoMdTrendingDown> -0.1</span> 
                                    </div>
                                </CoinCard>

                            </div>
                        </div>
                    </div>
                </div>
                <div style={styles.bottomContainer}>
                    <h1 style={styles.header3}>Total</h1>
                    <div style={styles.totalRightPanel}>
                        <div style={styles.totalPriceGroup}>
                            <h1 style={styles.header6}>Average Price</h1>
                            <h1 style={styles.header2}>0.0</h1> 
                        </div>
                        <div style={styles.totalPriceGroup}>
                            <h1 style={styles.header6}>Total Cost</h1>
                            <h1 style={styles.header2}>0.0</h1> 
                        </div>
                        <div style={styles.profitGroup2}>
                            <h1 style={styles.header6}>Total Cost</h1>
                            <span style={styles.smallcard2}><IoMdTrendingDown style={styles.trendingDown}></IoMdTrendingDown> -0.1</span>
                            
                        </div>
                        <div style={styles.profitGroup2}>
                            <h1 style={styles.header6}>% Profit</h1>
                            <span style={styles.smallcard2}><IoMdTrendingDown style={styles.trendingDown}></IoMdTrendingDown> -0.1</span>
                        </div>
                    </div>
                </div>
           </div>
        </Layout>
    )
}

const styles = {

    pageContainer:{
        display:'flex',
        flexDirection:'column',
        marginLeft: '6rem',
        marginTop: '2rem',
    },

    topContainer:{
        display:'flex',
        flexDirection:'row',
        marginBottom: '6rem',
    },

        leftPanel:{
            display:'flex',
            flexDirection:'column',
            margin: '1rem',
        },

            titleHeader:{
                fontSize: '50px',
                fontFamily: 'Sora',
                fontWeight: '900',
                marginBottom: '3rem',
            },

            topGroup:{
                height: '100px',
                width: '950px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            },

                dummyCashContainer:{
                    width: '215px',
                    height: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '2px solid white',
                    borderRadius: '20px',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: '10px',
                },

                    header1:{
                        fontSize: '12px',
                        fontFamily: 'Sora',
                        fontWeight: '700',
                        color: '#4A4A5A',
                    },

                    header2:{
                        fontSize: '18px',
                        fontFamily: 'Sora',
                        fontWeight: '900',
                        color: 'white',
                        margin: '5px',
                    },

                buttonGroup:{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: '10px',
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

            cardContainer:{
                display: 'flex',
                flexDirection: 'column',
            },

                card:{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '950px',
                    height: '80px',
                    border: '2px solid white',
                    borderRadius: '20px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '5px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                },

                cardHover: {
                    boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)', 
                    transform: 'scale(1.05)', 
                },

                    header3:{
                        fontSize: '20px',
                        fontFamily: 'Sora',
                        fontWeight: '900',
                        color: 'white',
                        margin: '10px',
                    },

                    smallcard: {
                        height: 'auto',
                        width: '50px',
                        backgroundColor: '#462E38',
                        padding: '1px',
                        borderRadius: '10px',
                        fontFamily: 'Sora',
                        fontWeight: '500',
                        fontSize: '12px',
                        textAlign: 'center',
                        justifyContent: 'center',
                    },

                    coinPlaceHolder:{
                        fontSize: '35px',
                        color: 'yellow',
                        padding: '5px',
                    },

                    priceGroup: {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },

                    smallcard2: {
                        display: 'flex',
                        flexDirection: 'row',
                        height: 'auto',
                        width: '50px',
                        backgroundColor: '#462E38',
                        color: '#CD5C5C',
                        padding: '1px',
                        borderRadius: '10px',
                        fontFamily: 'Sora',
                        fontWeight: '500',
                        fontSize: '12px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        margin: '5px',
                    },

                    trendingDown:{
                        color: '#CD5C5C',
                        margin: '3px',
                        fontWeight: 'bold',
                    },

        rightCard:{
        margin: '1rem',
        display:'flex',
        flexDirection:'column',
        height: '600px',
        width: '450px',
        border: '1px solid white',
        borderRadius: '20px',
        },

            upperGroup:{
                display:'flex',
                flexDirection:'row',
                justifyContent: 'space-between',
                padding: '2rem',
                height:'auto',
                width:'auto',
            },

                leftUpper:{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems:'left',
                },

                    header4:{
                        fontFamily: 'Sora',
                        fontWeight: '900',
                        fontSize: '30px',
                    },

                    header5:{
                        fontFamily: 'Sora',
                        fontWeight: '500',
                        fontSize: '18px',
                    },

                smallRightcard:{
                    display: 'flex',
                        flexDirection: 'row',
                        height: '35px',
                        width: '100px',
                        backgroundColor: '#462E38',
                        color: '#CD5C5C',
                        padding: '1px',
                        borderRadius: '10px',
                        fontFamily: 'Sora',
                        fontWeight: '500',
                        fontSize: '20px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        margin: '5px',
                },

            middleGroup:{
                display:'flex',
                flexDirection:'column',
                justifyContent: 'left',
                paddingLeft: '2rem',
                height:'auto',
                width:'auto',
            },

                radioGroup:{
                    display: 'flex',
                    flexDirection: 'row',
                },

                    radioButtonContainer: {
                        display: 'flex',
                        alignItems: 'center',
                        margin: '5px',
                        backgroundColor: '#4A4A5A',
                        borderRadius: '15px',
                        width: '150px',
                        height: '30px',
                        justifyContent: 'center', // Align items to the left
                        padding: '15px',
                    },
                    radioButtonLabel: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        color: 'white',
                        fontFamily: 'Sora',
                        fontSize: '14px',
                        fontWeight: '500',
                    },
                    radioInput: {
                        marginRight: '10px', // Adds space between radio button and label text
                    },
                
                cardButtonGroup:{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '20px',
                },
    
                    Button2: {
                        display: 'flex',
                        alignItems: 'center',
                        margin: '5px',
                        backgroundColor: '#42B8A4',
                        borderRadius: '15px',
                        width: '150px',
                        height: '40px',
                        justifyContent: 'center', // Align items to the left
                        padding: '20px',
                        fontFamily: 'Sora',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'white',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                    },

                    Button2Hover: {
                        boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.8)', 
                        transform: 'scale(1.05)',
                    },

                    Button3: {
                        display: 'flex',
                        alignItems: 'center',
                        margin: '5px',
                        backgroundColor: '#F4594E',
                        borderRadius: '15px',
                        width: '150px',
                        height: '40px',
                        justifyContent: 'center', // Align items to the left
                        padding: '20px',
                        fontFamily: 'Sora',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'white',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    },

                    Button3Hover: {
                        boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.8)', 
                        transform: 'scale(1.05)',
                    },
            
            coinCardContainer:{
                display:'flex',
                flexDirection:'column',
                justifyContent: 'center',
                marginTop: '1rem',
            },

                CoinCard:{
                    display:'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: '80px',
                    width: '350px',
                    border: '2px solid white',
                    borderRadius: '20px',
                    marginBottom: '1rem',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                },

                CoinCardHover: {
                    boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)', 
                    transform: 'scale(1.05)', 
                },

                innerCoinCard:{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center',
                    padding:'10px',
                    alignItems:'center',
                    margin: '5px',
                },

    bottomContainer:{
        display: 'flex',
        flexDirection: 'row',
        margin: '10px',
        height: '100px',
        width: '1400px',
        border: '1px solid white',
        borderRadius: '20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
    },

        totalRightPanel:{
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems:'center',
            padding: '5px',
        },

        totalPriceGroup: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
        },

        header6:{
            fontSize: '14px',
            fontFamily: 'Sora',
            fontWeight: '700',
            color: '#4A4A5A',
            padding: '1px',
            margin: '1px',
        },

        profitGroup2:{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
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

};
