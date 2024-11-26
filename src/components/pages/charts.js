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
    const [selectedCoinId, setSelectedCoinId] = useState("1"); // Default to BTCUSD (ID: 1)
    const [selectedCoin, setSelectedCoin] = useState({
        id: "1",
        name: "Bitcoin",
        symbol: "BTC",
        quote: {
            USD: {
                price: 0,
                percent_change_1h: 0,
                percent_change_24h: 0,
                percent_change_7d: 0,
                percent_change_30d: 0,
            },
        },
    });

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
    
            // Set selectedCoin to BTCUSD if no coin is already selected
            if (!selectedCoinId) {
                const btcData = data["1"]; // BTCUSD data
                setSelectedCoinId("1");
                setSelectedCoin(btcData);
            } else if (data[selectedCoinId]) {
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

    const idToSymbolMap = {
        "1": "COINBASE:BTCUSD",
        "2": "CRYPTO:LTCUSD",
        "52": "CRYPTO:XRPUSD",
        "74": "COINBASE:DOGEUSD",
        "512": "COINBASE:XLMUSD",
        "825": "COINBASE:USDTUSD",
        "1027": "CRYPTO:ETHUSD",
        "1518": "COINBASE:MKRUSD",
        "1697": "COINBASE:BATUSD",
        "1831": "CRYPTO:BCHUSD",
        "1839": "BINANCE:BNBUSD",
        "1958": "TRADENATION:TRONUSD",
        "1966": "COINBASE:MANAUSD",
        "1975": "CRYPTO:LINKUSD",
        "2010": "CRYPTO:ADAUSD",
        "2011": "BITFINEX:XTZUSD",
        "2130": "BITSTAMP:ENJUSD",
        "2280": "CRYPTO:FILUSD",
        "2586": "BITFINEX:SNXUSD",
        "2634": "BITFINEX:XDCUS",
        "2943": "CRYPTO:RPLUSD",
        "3155": "GEMINI:QNTUSD",
        "3408": "BITSTAMP:USDCUSD",
        "3635": "CRYPTO:CROUSD",
        "3794": "BINANCE:ATOMUSD",
        "3890": "BITFINEX:MATICUSD",
        "4030": "CRYPTO:ALGOUSD",
        "4066": "BITFINEX:CHZUSD",
        "4642": "CRYPTO:HBARUSD",
        "4705": "GEMINI:PAXGUSD",
        "5176": "BITFINEX:XAUTUSD",
        "5279": "CRYPTO:SOLOUSD",
        "5426": "CRYPTO:SOLUSD",
        "5567": "COINBASE:CGLDUSD",
        "5692": "CRYPTO:COMPUSD",
        "5805": "CRYPTO:AVAXUSD",
        "5824": "CRYPTO:SLPUSD",
        "5994": "CRYPTO:SHIBUS",
        "6210": "CRYPTO:SANDUSD",
        "6535": "CRYPTO:NEARUSD",
        "6636": "BINANCE:DOTUSD",
        "6758": "COINBASE:SUSHIUSD",
        "6783": "BINANCE:AXSUSD",
        "7080": "CRYPTO:GALAUSD",
        "7083": "CRYPTO:UNIUSD",
        "7278": "CRYPTO:AAVEUSD",
        "7429": "CRYPTO:LQTYUSD",
        "7725": "CRYPTO:TRUUSD",
        "8000": "COINBASE:LDOUSD",
        "8766": "CRYPTO:ALICEUSD",
        "9444": "COINBASE:KNCUSD",
        "9481": "CRYPTO:PENDLEUSD",
        "9720": "CRYPTO:LATUSD",
        "10603": "CRYPTO:IMXUSD",
        "10688": "CRYPTO:YGGUSD",
        "10804": "CRYPTO:FLOKIUSD",
        "10903": "CRYPTO:C98USD",
        "11212": "KRAKEN:ATLASUSD",
        "11213": "CRYPTO:POLISUSD",
        "11419": "CRYPTO:TONUSD",
        "11840": "COINBASE:OPUSD",
        "11841": "COINBASE:ARBUSD",
        "11857": "KRAKEN:GMXUSD",
        "13383": "BYBIT:CBXUSDT",
        "14101": "COINBASE:RONINUSD",
        "14783": "COINBASE:MAGICUSD",
        "16399": "POLONIEX:COREUMUSDT",
        "17081": "HTX:FANCUSDT",
        "17450": "CRYPTO:LOOKSUSD",
        "18876": "COINBASE:APEUSD",
        "18895": "CRYPTO:MBXUSD",
        "20947": "CRYPTO:SUIUSD",
        "21106": "BINANCE:RDNTUSD",
        "21259": "COINBASE:ZETAUSD",
        "21533": "CRYPTO:LISTAUSD",
        "21916": "GATEIO:ISKUSDT",
        "22059": "CRYPTO:VENOM2USD",
        "22765": "MEXC:ALUSDT",
        "22850": "COINBASE:HONEYUSD",
        "23095": "COINBASE:BONKUSD",
        "23121": "CRYPTO:BLURUSD",
        "23351": "BITGET:CRETAUSDT",
        "23635": "BINANCE:BNXUSD",
        "23707": "GATEIO:HXDUSD",
        "24478": "CRYPTOCAP:PEPE",
        "24911": "CRYPTO:TURBOUSD",
        "25028": "CRYPTO:ORDIUSD",
        "26081": "CRYPTO:FDUSDUSD",
        "27009": "CRYPTO:UNIBOTUSD",
        "27565": "CRYPTO:ARKMUSD",
        "27772": "KRAKEN:PYUSDUSBA",
        "27872": "CRYPTO:TRUMPMUSD",
        "28066": "CRYPTO:BANANAGUSD",
        "28081": "COINEX:SPXUSD",
        "28299": "BITFINEX:TOKENUSD",
        "28301": "BINANCE:MEMEUSDT",
        "28683": "CRYPTO:1000SATSUS",
        "28752": "CRYPTO:WIFUSD",
        "28829": "CRYPTO:MAVIAUSD",
        "28850": "CRYPTO:NOTUSD",
        "29335": "CRYPTO:PIXELSUSD",
        "29555": "KRAKEN:PORTALUSD",
        "29676": "CRYPTO:AEVOUSD",
        "29743": "CRYPTO:BRETT2USD",
        "29814": "CRYPTO:ETHFIUSD",
        "29835": "COINBASE:IOUSD",
        "29870": "CRYPTO:BOMEUSD",
        "30096": "CRYPTO:DEGEN4USD",
        "30126": "CRYPTO:MEWUSD",
        "30171": "CRYPTO:ENAUSD",
        "30315": "CRYPTO:OMNINUSD",
        "30449": "CRYPTO:TNSRUSD",
        "30494": "CRYPTO:EIGENUSD",
        "30843": "CRYPTO:REZUSD",
        "30933": "MEXC:DOGUSDT",
        "30969": "OKX:RUNECOINUSDT",
        "31165": "GATEIO:MCGUSDT",
        "31234": "GATEIO:HRTUSDT",
        "31510": "CRYPTO:MOTHERUSD",
        "31668": "COINEX:BDCUSDT",
        "31683": "KRAKEN:AIRUSD",
        "31704": "COINBASE:PIRATEUSD",
        "32195": "CRYPTO:HMSTRUSD",
        "32521": "CRYPTO:NEIRO3USD",
        "32698": "CRYPTO:DOGS2USD",
        "32717": "CRYPTO:SUNDOGUSD",
        "32724": "GATEIO:CATUSDT",
        "32984": "KUCOIN:UNIOUSDT",
        "33093": "CRYPTO:MOODENGUSD",
        "33440": "CRYPTO:GOATSEUSD",
        "33570": "COINEX:GNONUSDT"
    };

    
    
    useEffect(() => {
        if (selectedCoin) {
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/tv.js';
            script.async = true;
            script.onload = () => {
                new TradingView.widget({
                    "autosize": true,
                    "symbol": idToSymbolMap[selectedCoinId], // Dynamically set the symbol based on selected coin ID
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
    }, [selectedCoin]);  
    
    


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
                    symbol: idToSymbolMap[selectedId], // Use the map to get the symbol
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