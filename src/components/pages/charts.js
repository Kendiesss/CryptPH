// @/components/DummyPage.js
import Head from 'next/head';
import Layout from '../Layout'
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { MdOutlineChatBubble } from "react-icons/md";
import { FaMinus } from "react-icons/fa";
import React, {useState, useEffect } from 'react';
import styles from '@/styles/charts.module.css';


const coinData = [
    { icon: '🪙', name: 'BTC' },
    { icon: '🟢', name: 'ETH' },
    { icon: '🟡', name: 'BIN' },
    // add coins more here
];

const faqs = [
    {
        question: "What is CryptPH?",
        answer: "CryptPH is an innovative platform designed to make cryptocurrency trading more accessible in the Philippines. It provides users with cryptocurrency data visualizations, basic trading tools, and educational contents."
    },
    {
        question: "Who are CryptPH's Developers?",
        answer: "CryptPH was developed by a dedicated team of students, including John Ken B. Angeles, Giemmel Adryeane A. Magno, Job Matthew J. Milo, and Tom Cyrus P. Vilar. "
    },
    {
        question: "What is CryptPH's Virtual Trading Game and How to Access It?",
        answer: "CryptPH's Virtual Trading Game allows users to practice trading without risking real money. To start, sign up for an account, and you'll be given a set amount of virtual currency to trade. You can then explore the different trading pairs and try your hand at buying and selling cryptocurrencies based on market data. The game helps users build their skills and confidence before engaging in real-world trading."
    },
    {
        question: "How to Register for an Account?",
        answer: "At the home page, click the register button. You will be redirected to the register page. Users can register and login using their Google Accounts."
    }

];



export default function DummyPage({ title }) {
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        // Load the TradingView chart when the component mounts
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
            new TradingView.widget({
                "autosize": true,
                "symbol": "BINANCE:BTCUSDT", // Adjust the crypto pair as necessary
                "interval": "D", // Daily interval
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1", // Candlestick chart
                "locale": "en",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "hide_side_toolbar": false,
                "hide_top_toolbar": false,
                "withdateranges": true,
                "allow_symbol_change": true,
                "container_id": "tradingview_advanced"
            });
        };
        document.body.appendChild(script);
        return () => {
            // Cleanup script when component unmounts
            document.body.removeChild(script);
        };
    }, []);
    


    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };


    return (
        <Layout pageTitle={title}>
            <div className={styles.pageContainer}>
                <div className={styles.leftPanel}>
                    <div className={styles.dropDownGroup}>
                        <select className={styles.dropdown}>
                            {coinData.map((coin, index) => (
                                <option key={index} value={coin.name}>
                                    {coin.icon} {coin.name}
                                </option>
                            ))}
                        </select>
                        <div className={styles.cryptoDataGroup}>
                            <h1 className={styles.cryptoData1}>&#x20B1;3,852,578</h1>
                            <h1 className={styles.cryptoData2}><span className={styles.arrowIcon}><IoMdArrowDropdown /></span> 3.2%</h1>
                        </div>
                    </div>
                    <h1 className={styles.header1}>Latest News in CryptPH</h1>
                    <div className={styles.newsCardContainer}>
                        <div className={styles.newsCard}>
                            <h1 className={styles.newsHeader}>Lorem ipsum dolor sit amet...</h1>
                            <p className={styles.p1}>10 days ago</p>
                        </div>
                        {/* Add more news cards here */}
                    </div>
                </div>

                <div className={styles.rightPanel}>
                    {/* TradingView Advanced Chart */}
            
                        <div id="tradingview_advanced" className={styles.tradingViewWidget} ></div> {/* Chart container */}
                    
                    <div className={styles.historicalDataContainer}>

                            <div className={styles.hdataCard}>
                                <h1 className={styles.header3}>1h</h1>
                                <h1 className={styles.cryptoData2}><span className={styles.arrowIcon}><IoMdArrowDropdown /></span> 0.0%</h1>
                            </div>

                            <div className={styles.hdataCard}>
                                <h1 className={styles.header3}>24h</h1>
                                <h1 className={styles.cryptoData2}><span className={styles.arrowIcon}><IoMdArrowDropdown /></span> 0.0%</h1>
                            </div>

                            <div className={styles.hdataCard}>
                                <h1 className={styles.header3}>7d</h1>
                                <h1 className={styles.cryptoData2}><span className={styles.arrowIcon}><IoMdArrowDropdown /></span> 0.0%</h1>
                            </div>

                            <div className={styles.hdataCard}>
                                <h1 className={styles.header3}>14d</h1>
                                <h1 className={styles.cryptoData2}><span className={styles.arrowIcon}><IoMdArrowDropdown /></span> 0.0%</h1>
                            </div>

                            <div className={styles.hdataCard}>
                                <h1 className={styles.header3}>30d</h1>
                                <h1 className={styles.cryptoData2}><span className={styles.arrowIcon}><IoMdArrowDropdown /></span> 0.0%</h1>
                            </div>

                            <div className={styles.hdataCard}>
                                <h1 className={styles.header3}>1yr</h1>
                                <h1 className={styles.cryptoData2}><span className={styles.arrowIcon}><IoMdArrowDropdown /></span> 0.0%</h1>
                            </div>
                    </div>
                    <div className={styles.faqSection}>
                        <h1 className={styles.header2}>
                            Frequently Asked Questions 
                            <MdOutlineChatBubble className={styles.icon}/>
                        </h1>
                        {faqs.map((faq, index) => (
                            <div key={index} className={styles.faqCard}>
                               <h1 
                                    className={styles.faqHeader} 
                                    onClick={() => toggleFaq(index)}
                                >
                                    {faq.question}
                                    {openFaq === index ? (
                                        <FaMinus className={`${styles.minusIcon}`} />
                                    ) : (
                                        <FaPlus className={`${styles.plusIcon}`} />
                                    )}
                                </h1>
                                <p 
                                    className={`${styles.faqAnswer} ${openFaq === index ? styles.showAnswer : ''}`}
                                >
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
            
                </div>


            </div>
        </Layout>
    
    )

}

