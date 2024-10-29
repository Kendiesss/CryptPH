import Head from 'next/head';
import Layout from '../Layout';
import { FaBitcoin } from "react-icons/fa";
import { IoMdTrendingDown, IoMdTrendingUp } from 'react-icons/io';
import gradient1 from '@/img/gradient-1.png';
import React, {useState, useEffect} from 'react';


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

export default function DummyPage({ title }) {

    const [selectedCoin, setSelectedCoin] = useState(null);
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false); //For Entry Button
    const [isHovered5, setIsHovered5] = useState(false); //For Exit Button

    const [cryptoData, setCryptoData] = useState(null);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    

    const handleViewClick = (coin) => {
        setSelectedCoin(coin); // Update the selected coin state
    };

    const formatNumberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

        const fetchData = async () => {
            try {

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

            const response = await fetch(`/api/crypto?ids=${ids}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setCryptoData(data);
            } catch (error) {
            setError(error.message);
            }
        };

        useEffect(() => {
            fetchData();
        
            const intervalId = setInterval(() => {
              fetchData();
            }, 60000);
        
            return () => {
              clearInterval(intervalId);
            };
          }, []);
        
    
        if (error) return <div>Error: {error}</div>;
        if (!cryptoData) return <div>Loading...</div>;

        // Filter and paginate the data
        const totalItems = Object.keys(cryptoData).length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);


        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentItems = Object.keys(cryptoData).slice(startIndex, startIndex + itemsPerPage);

        const handlePageClick = ({ selected }) => setCurrentPage(selected);

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
                        {selectedCoin ? (
                            <>
                                <div style={styles.upperGroup}>
                                    <div style={styles.leftUpper}>
                                        <h1 style={styles.header4}>{formatNumberWithCommas((selectedCoin.quote.USD.price * 56).toFixed(2))}</h1>
                                        <h1 style={styles.header5}>{selectedCoin.name}</h1>
                                    </div>
                                    <span style={styles.smallRightcard}>
                                        {selectedCoin.quote.USD.percent_change_1h >= 0 ? (
                                            <IoMdTrendingUp style={styles.trendingUp} />
                                        ) : (
                                            <IoMdTrendingDown style={styles.trendingDown} />
                                        )}
                                        <span style={{
                                            color: selectedCoin.quote.USD.percent_change_1h >= 0 ? 'green' : 'red'
                                        }}>
                                            {selectedCoin.quote.USD.percent_change_1h.toFixed(2)}%
                                        </span>
                                     </span>
                                </div>

                                <div style={styles.middleGroup}>    
                                    <div style={styles.flexContainer}>
                                        <span style={styles.dataGroup}>
                                            <h3 style={styles.header7}>Market Cap</h3><h1 style={styles.header8}>{formatNumberWithCommas((selectedCoin.quote.USD.market_cap / 1e12).toFixed(2))} T</h1>
                                        </span>
                                        <span style={styles.dataGroup}>
                                            <h3 style={styles.header7}>24h Volume</h3><h1 style={styles.header8}>{formatNumberWithCommas((selectedCoin.quote.USD.volume_24h * 56).toFixed(2))}</h1>
                                        </span>
                                        <span style={styles.dataGroup}>
                                            <h3 style={styles.header7}>Circulating Supply</h3><h1 style={styles.header8}>{formatNumberWithCommas(selectedCoin.circulating_supply)}</h1>
                                        </span>
                                    </div>
                                    <div style={styles.qtyGroup}>
                                        <label style={styles.header2} htmlFor="quantity">Quantity</label><br></br>
                                        <input 
                                            type="number" 
                                            id="quantity" 
                                            name="quantity" 
                                            style={styles.inputField} 
                                            placeholder="Enter quantity" 
                                        />
                                    </div>
                                    <br></br>

                                    <h1 style={styles.header2}>Action</h1>

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
                                </div>
                            </>
                         ) : (
                            <p>Select a coin to view its details.</p>
                        )}
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

                <div style={styles.tableContainer}>
                <div>
                    <h1 style={styles.titleHeader}>Crypto Market</h1>
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th style={styles.tableHeader}>Coin Name</th>
                            <th style={styles.tableHeader}>Symbol</th>
                            <th style={styles.tableHeader}>Price (PHP)</th>
                            <th style={styles.tableHeader}>1h Change (%)</th>
                            <th style={styles.tableHeader}>24h Change (%)</th>
                            <th style={styles.tableHeader}>7d Change (%)</th>
                            <th style={styles.tableHeader}>Volume (24h)</th>
                            <th style={styles.tableHeader}>Market Cap (in Trillions)</th>
                            <th style={styles.tableHeader}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((id) => {
                            const coin = cryptoData[id];
                            const pricePHP = formatNumberWithCommas((coin.quote.USD.price * 56).toFixed(2)); // Adjust multiplier as needed
                            const marketCapT = formatNumberWithCommas((coin.quote.USD.market_cap / 1e12).toFixed(2)); // Convert to trillions
                            const volume24hPHP = formatNumberWithCommas((coin.quote.USD.volume_24h * 56).toFixed(2));

                            return (
                            <tr key={id}>
                                 <td style={styles.tableCell}>{coin.name} <img src={coin.logo} alt={`${coin.name} logo`} style={styles.logo} /></td>
                                 <td style={styles.tableCell}>{coin.symbol}</td>
                                 <td style={styles.tableCell}>₱{pricePHP}</td>
                                 <td style={styles.tableCell}>
                                    <span style={coin.quote.USD.percent_change_1h < 0 ? styles.changeNegative : styles.changePositive}>
                                        {coin.quote.USD.percent_change_1h.toFixed(2)}%
                                    </span>
                                </td>
                                <td style={styles.tableCell}>
                                    <span style={coin.quote.USD.percent_change_24h < 0 ? styles.changeNegative : styles.changePositive}>
                                        {coin.quote.USD.percent_change_24h.toFixed(2)}%
                                    </span>
                                </td>
                                <td style={styles.tableCell}>
                                    <span style={coin.quote.USD.percent_change_7d < 0 ? styles.changeNegative : styles.changePositive}>
                                        {coin.quote.USD.percent_change_7d.toFixed(2)}%
                                    </span>
                                </td>
                                 <td style={styles.tableCell}>₱{volume24hPHP}</td>
                                 <td style={styles.tableCell}>₱{marketCapT} T</td>

                                 <td style={styles.tableCell}>
                                 <button style={styles.button1} onClick={() => handleViewClick(coin)}>VIEW</button>
                                 </td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>

                    <div className={styles.pagination}>
                        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                        Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                        Next
                        </button>
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
        marginBottom: '1rem',
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
                        color: 'red',
                        margin: '3px',
                        fontWeight: 'bold',
                    },

                    trendingUp:{
                        color: 'green',
                        margin: '3px',
                        fontWeight: 'bold',
                    },

        rightCard:{
        margin: '1rem',
        display:'flex',
        flexDirection:'column',
        height: '675px',
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

            flexContainer:{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left', /* Even spacing between items */
                alignItems: 'left', /* Center items vertically */
                backgroundColor: 'whitesmoke',
                marginRight: '1rem',
                marginBottom: '2rem',
                borderRadius: '1rem',
                padding: '1rem',
              },

              dataGroup:{
                width: '18rem',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                
              },

              header7:{
                fontSize: '12px',
                fontFamily: 'Sora',
                fontWeight: '500',
                color: '#0B162B',
            },

            header8:{
                fontSize: '16px',
                fontFamily: 'Sora',
                fontWeight: '800',
                color: '#0B162B',
            },

            qtyGroup:{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'left',
                justifyContent: 'space-between',
                marginRight: '1rem',
            },

            inputField:{
                borderRadius: '1rem',
                color: 'black',
                fontSize: '14px',
                textAlign: 'center',
            },
                 
                cardButtonGroup:{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '1rem',
                    padding: '1rem',
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

        //table

        tableContainer: {
            marginTop: '20px',
            overflowX: 'auto', // Allows for horizontal scrolling on smaller screens
            padding: '1rem',
            borderRadius: '5rem',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid white',
        },
        tableHeader: {
            backgroundColor: '#f2f2f2',
            fontSize: '1em',
            textAlign: 'left',
            padding: '12px',
            borderBottom: '1px solid #ddd',
            fontFamily: 'Sora',
            fontWeight: '900',
            padding: '10px',
            color: '#0B162B',
        },
        tableCell: {
            padding: '12px',
            height: '10rem',
            borderBottom: '1px solid #ddd',
            fontFamily: 'Sora',
            fontWeight: '900',
            fontSize: '1em',
        },

        changePositive: {
            width: '1rem',
            color: 'green',
            backgroundColor: '#141821',
            padding: '10px',
            fontWeight: '500',
            borderRadius: '1rem',
            border: '0.5px solid white',
        },
        changeNegative: {
            width: '1rem',
            color: 'red',
            backgroundColor: '#141821',
            padding: '10px',
            fontWeight: '500',
            borderRadius: '1rem',
            border: '0.5px solid white',
        },

        pagination: {
            display: 'flex',
            justifyContent: 'center',
            margin: '20px 0',
        },
          
        paginationButton: {
            margin: '0 5px',
            padding: '10px',
            cursor: 'pointer',
        },

};
