// @/components/DummyPage.js
import Head from 'next/head';
import Layout from '../Layout'
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { MdOutlineChatBubble } from "react-icons/md";
import { FaMinus } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react';
import styles from '@/styles/charts.module.css';

const ids = [ //Dont Modify or Delete, Important!!!
    '7278', '29676', '31683', '4030', '18876', '11841', '22765', '27565', '5805', '6783', 
    '28066', '1697', '31668', '23635', '1839', '1', '1831', '23121', '29870', '23095', 
    '29743', '2010', '30126', '5567', '1975', '4066', '10903', '5692', '16399', '3794', 
    '23351', '13383', '3635', '1966', '30096', '74', '30933', '32698', '28752', '30494', 
    '2130', '30171', '1027', '29814', '17450', '10804', '2280', '26081', '7080', '33440', 
    '11857', '32195', '4642', '28829', '31234', '22850', '23707', '29835', '10603', '21916', 
    '9444', '8000', '7429', '21533', '2', '17081', '27872', '14783', '1518', '18895', 
    '31165', '28301', '33093', '31510', '8766', '6535', '32521', '28850', '33570', '11840', 
    '30315', '25028', '4705', '27772', '9481', '24478', '31704', '29335', '9720', '6636', 
    '3890', '29555', '3155', '21106', '30843', '52', '2943', '14101', '30969', '32724', 
    '32717', '5994', '5824', '5426', '5279', '28081', '11212', '11213', '512', '20947', 
    '6758', '2586', '30449', '5176', '825', '2011', '6210', '28299', '11419', '1958', 
    '7725', '24911', '3408', '27009', '32984', '7083', '22059', '2634', '52', '21259', 
    '10688', '28683'
].join(','); 

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
    const [cryptoData, setCryptoData] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [selectedCoinId, setSelectedCoinId] = useState(null); // Declare selectedCoinId here
    const [error, setError] = useState(null);
    const [priceChanged, setPriceChanged] = useState(false);
    

    


    const prevPriceRef = useRef();

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/crypto?ids=${ids}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setCryptoData(data);
            setError(null);

            // Check if the previously selected coin is still available
            if (selectedCoinId && data[selectedCoinId]) {
                const newPrice = data[selectedCoinId].quote.USD.price;
                const prevPrice = prevPriceRef.current;

                if (prevPrice !== undefined && newPrice !== prevPrice) {
                    setPriceChanged(true);
                    setTimeout(() => setPriceChanged(false), 3000);
                }
                
                prevPriceRef.current = newPrice;
                setSelectedCoin(data[selectedCoinId]);
            }

        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data on component mount

        const intervalId = setInterval(() => {
            fetchData(); // Refresh data every minute
        }, 60000);

        return () => {
            clearInterval(intervalId);
        };
    }, [selectedCoinId]); // Change dependency to selectedCoinId


    useEffect(() => {
        if (selectedCoin) {
            // Load the TradingView chart when the component mounts
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/tv.js';
            script.async = true;
            script.onload = () => {
                new TradingView.widget({
                    "autosize": true,
                    "symbol": `BINANCE:${selectedCoin.symbol}USD`, // Dynamically set the symbol based on selected coin
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
        }
    }, [selectedCoin]);  // Dependency on selectedCoin to reload chart when coin changes
    
    


    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleCoinSelect = (event) => {
        const selectedId = event.target.value;
        setSelectedCoinId(selectedId);
        const selectedCoinData = cryptoData[selectedId];
        setSelectedCoin(selectedCoinData);
    
        // Store the selected coin data in sessionStorage
        if (selectedCoinData) {
            sessionStorage.setItem(
                'selectedCoin',
                JSON.stringify({
                    id: selectedId,
                    name: selectedCoinData.name,
                    symbol: selectedCoinData.symbol,
                    logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${selectedId}.png`,
                    price: selectedCoinData.quote.USD.price,
                    percentChange1h: selectedCoinData.quote.USD.percent_change_1h,
                    percentChange24h: selectedCoinData.quote.USD.percent_change_24h,
                    percentChange7d: selectedCoinData.quote.USD.percent_change_7d,
                    percentChange30d: selectedCoinData.quote.USD.percent_change_30d,
                })
            );
        }
    };

    useEffect(() => {
        // Retrieve the stored coin data from sessionStorage
        const storedCoinData = sessionStorage.getItem('selectedCoin');
        if (storedCoinData) {
            const parsedCoin = JSON.parse(storedCoinData);
            setSelectedCoinId(parsedCoin.id);
            setSelectedCoin({
                ...parsedCoin,
                quote: {
                    USD: {
                        price: parsedCoin.price,
                        percent_change_1h: parsedCoin.percentChange1h,
                        percent_change_24h: parsedCoin.percentChange24h,
                        percent_change_7d: parsedCoin.percentChange7d,
                        percent_change_30d: parsedCoin.percentChange30d,
                    }
                }
            });
        }
    }, []);
    
    
    


    return (
        <Layout pageTitle={title}>
            <div className={styles.pageContainer}>
                <div className={styles.leftPanel}>
                    <div className={styles.dropDownGroup}>
                    <select 
                        className={styles.dropdown} 
                        onChange={handleCoinSelect} 
                        value={selectedCoinId || ''}
                    >
                        <option value="">Select a coin</option>
                        {Object.keys(cryptoData).map((key) => (
                            <option key={key} value={key}>
                                {cryptoData[key].symbol} - {cryptoData[key].name}
                            </option>
                        ))}
                    </select>
                    {selectedCoin && (
                        <div className={styles.cryptoDataGroup}>
                            <img
                                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${selectedCoinId}.png`}
                                alt={selectedCoin.name}
                                style={{ maxWidth: "30px", height: "30px", marginRight: "10px" }}
                            />
                            <h1
                                className={priceChanged ? styles.priceChangeAnimation : ''}
                            >
                                ${selectedCoin.quote.USD.price.toFixed(2)}
                            </h1>
                            <h1 
                                className={`${styles.cryptoData2} ${
                                    selectedCoin.quote.USD.percent_change_1h >= 0
                                        ? styles.positiveChange
                                        : styles.negativeChange
                                }`}
                            >
                                <span className={styles.arrowIcon}>
                                    {selectedCoin.quote.USD.percent_change_1h >= 0 ? '📈' : '📉'}
                                </span>
                                {selectedCoin.quote.USD.percent_change_1h.toFixed(2)}%
                            </h1>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.rightPanel}>
                    {/* TradingView Chart */}
                    <div id="tradingview_advanced" className={styles.tradingViewWidget}></div>

                    <div className={styles.historicalDataContainer}>
                        {selectedCoin && (
                            <>
                                <div className={styles.hdataCard}>
                                    <h1 className={styles.header3}>1h</h1>
                                    <h1 
                                        className={`${styles.cryptoData2} ${
                                            selectedCoin.quote.USD.percent_change_1h >= 0
                                                ? styles.positiveChange
                                                : styles.negativeChange
                                        }`}
                                    >
                                        <span className={styles.arrowIcon}>
                                            {selectedCoin.quote.USD.percent_change_1h >= 0 ? '📈' : '📉'}
                                        </span>
                                        {selectedCoin.quote.USD.percent_change_1h.toFixed(2)}%
                                    </h1>
                                </div>
                                <div className={styles.hdataCard}>
                                    <h1 className={styles.header3}>24h</h1>
                                    <h1 
                                        className={`${styles.cryptoData2} ${
                                            selectedCoin.quote.USD.percent_change_24h >= 0
                                                ? styles.positiveChange
                                                : styles.negativeChange
                                        }`}
                                    >
                                        <span className={styles.arrowIcon}>
                                            {selectedCoin.quote.USD.percent_change_24h >= 0 ? '📈' : '📉'}
                                        </span>
                                        {selectedCoin.quote.USD.percent_change_24h.toFixed(2)}%
                                    </h1>
                                </div>
                                <div className={styles.hdataCard}>
                                    <h1 className={styles.header3}>7d</h1>
                                    <h1 
                                        className={`${styles.cryptoData2} ${
                                            selectedCoin.quote.USD.percent_change_7d >= 0
                                                ? styles.positiveChange
                                                : styles.negativeChange
                                        }`}
                                    >
                                        <span className={styles.arrowIcon}>
                                            {selectedCoin.quote.USD.percent_change_7d >= 0 ? '📈' : '📉'}
                                        </span>
                                        {selectedCoin.quote.USD.percent_change_7d.toFixed(2)}%
                                    </h1>
                                </div>
                                {/* Add more historical data for 30d, 1yr as needed */}
                                <div className={styles.hdataCard}>
                                    <h1 className={styles.header3}>30d</h1>
                                    <h1 
                                        className={`${styles.cryptoData2} ${
                                            selectedCoin.quote.USD.percent_change_30d >= 0
                                                ? styles.positiveChange
                                                : styles.negativeChange
                                        }`}
                                    >
                                        <span className={styles.arrowIcon}>
                                            {selectedCoin.quote.USD.percent_change_30d >= 0 ? '📈' : '📉'}
                                        </span>
                                        {selectedCoin.quote.USD.percent_change_30d.toFixed(2)}%
                                    </h1>
                                </div>
                            </>
                        )}
                    </div>

                    {/* FAQ Section */}
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
    );
}