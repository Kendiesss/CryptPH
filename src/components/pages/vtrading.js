import Head from 'next/head';
import Layout from '../Layout';
import { RiCoinsFill } from "react-icons/ri";
import { FaBoxOpen } from "react-icons/fa";
import { IoMdTrendingDown, IoMdTrendingUp, IoMdHelpCircleOutline } from 'react-icons/io';
import gradient1 from '@/img/gradient-1.png';
import Modal from '@/components/Layout/modal';
import Modal2 from '@/components/Layout/modal2';
import Modal3 from '@/components/Layout/modal3';
import RestartModal from '@/components/Layout/RestartModal';
import React, {useState, useEffect} from 'react';
import modalStyles from '@/styles/modal.module.css';
import TradingViewWidget from './TradingViewWidget'; // Adjust the path accordingly
import widgetData from '@/data/widgetData'; 
import TutorialModal from '@/components/Layout/TutorialModal.js';
import styles from '@/styles/vtrading.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

const Card = ({ children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`${styles.card} ${isHovered ? styles.cardHover : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </div>
    );
};

export default function DummyPage({ title }) {

    //Accessibility
    const { data: session, status } = useSession(); // Get session data
    const router = useRouter();


    useEffect(() => {
        const storedCoinData = sessionStorage.getItem('selectedCoin');
        if (storedCoinData) {
            setSelectedCoin(JSON.parse(storedCoinData));
        }
    }, []);

    const [symbol, setSymbol] = useState(null);
    const [selectedCoin, setSelectedCoin] = useState({
        id: null,
        name: '',
        symbol: '',
        logo: '',
        quote: { USD: { price: 0, percent_change_1h: 0 } }
    });
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false); //For Entry Button
    const [isHovered5, setIsHovered5] = useState(false); //For Exit Button
    const [activeButton, setActiveButton] = useState(null); // Track the active button

  const handleButtonClick = (button) => {
    setActiveButton(button); // Set the clicked button as active
  };
    

    const [cryptoData, setCryptoData] = useState(null);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    //Modals
    const [openModal, setOpenModal] = useState(null);
    const openSpecificModal = (modalName) => setOpenModal(modalName);
    const [BuySuccessModal, setBuySuccessModal] = useState(false);
    const [SellSuccessModal, setSellSuccessModal] = useState(false);

    //Tradingview Modal
    const [openTVModal, setOpenTVModal] = useState(null);


    //Sample Error and Lose Modals

    //Lose Modal
    const [isLoseModalOpen, setIsLoseModalOpen] = useState(false);
    const openLoseModal = () => setIsLoseModalOpen(true);
    const closeLoseModal = () => setIsLoseModalOpen(false);

    //Error Modal
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const openErrorModal = () => setIsErrorModalOpen(true);
    const closeErrorModal = () => setIsErrorModalOpen(false);

    //Buy Modal
    const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
    const openBuyModal = () => setIsBuyModalOpen(true);
    const closeBuyModal = () => setIsBuyModalOpen(false);

    //Sell Modal
    const [isSellModalOpen, setIsSellModalOpen] = useState(false);
    const openSellModal = () => setIsSellModalOpen(true);
    const closeSellModal = () => setIsSellModalOpen(false);

    //Sell Modal
    const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
    const closeInvestmentModal = () => setIsInvestmentModalOpen(false);

    //Tutorial Modal
    const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);
    const openTutorModal = () => setIsTutorModalOpen(true);
    const closeTutorModal = () => setIsTutorModalOpen(false);

    // Correcting the typo and ensuring consistent naming
    const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);
    const openRestartModal = () => setIsRestartModalOpen(true);
    const closeRestartModal = () => setIsRestartModalOpen(false);

    //GAME LOGIC!!!

    const [investedCoin, setInvestedCoin] = useState(null); // Stores invested coin details
    const [dummyCash, setDummyCash] = useState(100000);  
    const [investment, setInvestment] = useState(0);      
    const [coinQuantity, setCoinQuantity] = useState(0);  
    const [entryPrice, setEntryPrice] = useState(0);      
    const [isEntryActive, setIsEntryActive] = useState(true);
    const [quantity, setQuantity] = useState(0);          
    const [hasInvested, setHasInvested] = useState(false); 
    const [profitOrLoss, setProfitOrLoss] = useState(0);


    // const [cardAveragePrice, setCardAveragePrice] = useState(0);
    // const [cardTotalCost, setCardTotalCost] = useState(0);
    // const [cardProfit, setCardProfit] = useState(0);

    const [orderHistory, setOrderHistory] = useState([]);

    const [investments, setInvestments] = useState([]);

    //Panel Switching for Porfolio, Records and Order History
    const [activePanel, setActivePanel] = useState('panel1');
    const handlePanelSwitch = (panel) => {
        setActivePanel(panel);
      };


    //Currency swap  
    const [currency, setCurrency] = useState('USD'); // Default currency is USD
    const [exchangeRate, setExchangeRate] = useState(1); // Conversion rate (1 USD = 1 PHP initially)


    const coinPrice = selectedCoin?.quote?.USD?.price ?? 0;

    const handleEntry = () => {
        const quantity = parseFloat(document.getElementById('quantity').value);
        const currentPrice = selectedCoin.quote.USD.price;
        const investmentAmount = quantity * currentPrice;
    
        if (quantity > 0 && investmentAmount <= dummyCash) {

            const updatedDummyCash = dummyCash - investmentAmount;
            setDummyCash(updatedDummyCash);
            setInvestment(investment + investmentAmount);
            setCoinQuantity(coinQuantity + quantity);
            setEntryPrice(currentPrice);
    
            // Create a new investment object for the coin
            const newInvestment = {
                id: selectedCoin.id,               // Unique ID for the coin
                name: selectedCoin.name,
                symbol: selectedCoin.symbol,
                logo: selectedCoin.logo,
                pricePHP: currentPrice,  // Convert to PHP
                quantity: quantity,
                totalCost: investmentAmount,
                averagePrice: currentPrice,
                profit: 0,
            };
    
            // Add the new investment to the list and track as the current investment
            const updatedInvestments = ([...investments, newInvestment]);
            setInvestments(updatedInvestments);
            setInvestedCoin(newInvestment); // Track the current investment

            // Save investments to localStorage
            sessionStorage.setItem('dummyCash', JSON.stringify(updatedDummyCash));
            sessionStorage.setItem('investments', JSON.stringify(updatedInvestments));

            setIsBuyModalOpen(true);
            // alert(`Successfully invested $${investmentAmount.toFixed(2)} in ${selectedCoin.name}!`);
        } else if (quantity <= 0) {
            alert('Please enter a valid quantity greater than 0.');
        } else {
            // Open the error modal when insufficient balance
            setIsErrorModalOpen(true);
        }
    };


    const handleExit = () => {
        if (investedCoin) {
            const currentValue = investedCoin.quantity * coinPrice;
            const profitOrLoss = currentValue - investedCoin.totalCost;
            const profitPercent = ((currentValue - investedCoin.totalCost) / investedCoin.totalCost) * 100;
    
            // Add to order history
            const exitedInvestment = {
                coinName: investedCoin.coinName,
                symbol: investedCoin.symbol,
                quantity: investedCoin.quantity,
                priceAtEntry: investedCoin.totalCost / investedCoin.quantity,
                priceAtExit: coinPrice,
                profitPercent: profitPercent,
                date: new Date(),
                coinId: investedCoin.id,
            };
    
            setOrderHistory((prevHistory) => [...prevHistory, exitedInvestment]);
    
            // Update dummy cash balance
            const newDummyCash = dummyCash + currentValue;
            setDummyCash(newDummyCash);
    
            // Save the new dummy cash balance to sessionStorage
            sessionStorage.setItem('dummyCash', JSON.stringify(newDummyCash));
    
            // Show exit alert (integrated into the modal)
            setIsSellModalOpen(true);
    
            // Remove the exited investment from the investments array
            const updatedInvestments = investments.filter((inv) => inv.id !== investedCoin.id);
            setInvestments(updatedInvestments);
    
            // Save the updated investments list to sessionStorage
            sessionStorage.setItem('investments', JSON.stringify(updatedInvestments));
    
            // Reset the invested coin state
            setInvestedCoin(null);
    
            // Close the modal after exiting (optional)
            closeModal();
    
            // Check if the new dummy cash is zero or less, open the lose modal if true
            if (newDummyCash <= 0) {
                openLoseModal(); // Show the lose modal
            }
        } else {
            // If no investment is active, close the modal and open the investment modal
            setIsInvestmentModalOpen(true);
            closeModal();
        }
    };
    
    
        // Load investments and dummyCash from localStorage on page load
        useEffect(() => {
            const savedInvestments = sessionStorage.getItem('investments');
            const savedDummyCash = sessionStorage.getItem('dummyCash');
            
            if (savedInvestments) {
                setInvestments(JSON.parse(savedInvestments)); // Restore the investments
            }

            if (savedDummyCash) {
                setDummyCash(JSON.parse(savedDummyCash)); // Restore dummyCash
            }
        }, []);


          const confirmRestart = () => {
            // Here you could reset everything as needed
            setDummyCash(100000);  // Reset dummy cash
            setInvestments([]);    // Clear investments
            setOrderHistory([]);   // Clear order history
            setInvestedCoin(null); // Reset invested coin state
            closeRestartModal();
          };
        

    //currency conversion
    const convertCurrency = (amount) => {
        if (currency === 'USD') {
          return (amount / exchangeRate).toFixed(2); // Convert PHP to USD
        }
        return (amount * exchangeRate).toFixed(2); // Convert USD to PHP
      };
    
    
    

    const handleQuantityChange = (event) => {
        const value = Number(event.target.value);
        setQuantity(value);
    };
  
    const closeModal = () => {
        setOpenModal(null);
        setBuySuccessModal(false); // Close second modal when first is closed
        setSellSuccessModal(false); // Close second modal when first is closed
      };
    
    const openBuySuccessModal = () => {
        setBuySuccessModal(true); // Open second modal
        setOpenModal(null); // Close the first modal
    };

    const openSellSuccessModal = () => {
        setSellSuccessModal(true); // Open second modal
        setOpenModal(null); // Close the first modal
    };

    const handleViewClick = (coin) => {
        setSelectedCoin(coin); // Update the selected coin state
        
        // Store the selected coin in sessionStorage to persist the selection
        sessionStorage.setItem(
            'selectedCoin',
            JSON.stringify({
                id: coin.id,
                name: coin.name,
                symbol: coin.symbol,
                logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
                price: coin.quote.USD.price,
                percentChange1h: coin.quote.USD.percent_change_1h,
                percentChange24h: coin.quote.USD.percent_change_24h,
                percentChange7d: coin.quote.USD.percent_change_7d,
                percentChange30d: coin.quote.USD.percent_change_30d,
            })
        );
    
        // Check for an existing investment for this coin
        const existingInvestment = investments.find(inv => inv.id === coin.id);
        setInvestedCoin(existingInvestment || null); // Set the current investment if it exists
    
        // Set the symbol if found in widgetData
        const match = widgetData.find(item => item.id === coin.id);
        setSymbol(match ? match.symbol : null);
    };
    

    const formatNumberWithCommas = (number) => {
        // Check if the number is valid
        if (isNaN(number) || number === null || number === undefined) {
            return 'N/A';  // Or any other fallback value you want
        }
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

          useEffect(() => {
            // Ensure selectedCoin is synced with the updated cryptoData if it's based on `cryptoData`
            if (selectedCoin && cryptoData) {
              const newCoin = cryptoData[selectedCoin.id];
              if (newCoin && newCoin !== selectedCoin) {
                setSelectedCoin(newCoin);
              }
            }
          }, [cryptoData]); 
        
    
        if (error) return <div>Error: {error}</div>;
        if (!cryptoData) return <div>Loading...</div>;

        // Filter and paginate the data
        const totalItems = Object.keys(cryptoData).length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);


        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentItems = Object.keys(cryptoData).slice(startIndex, startIndex + itemsPerPage);

        const handlePageClick = ({ selected }) => setCurrentPage(selected);

        const getSymbol = (selectedCoinId) => {
            const match = widgetData.find(item => item.id === selectedCoinId);
            return match ? match.symbol : null; // Return symbol if found, else null
        };


    return (
        <Layout
            pageTitle={title}
        >

        <Modal
            isOpen={openModal === 'modal1'}
            onClose={closeModal}
            title="Confirmation"
            content={<p>Do you want to buy this coin?</p>}
            footerActions={
                <>
                  <button className={modalStyles.cancelButton} onClick={closeModal}>Cancel</button>
                  <button className={modalStyles.confirmButton} onClick={openBuySuccessModal} >Confirm</button>
                </>
            }
        />

        <Modal
            isOpen={openModal === 'modal2'}
            onClose={closeModal}
            title="Confirmation"
            content={<p>Do you want to sell this coin?</p>}
            footerActions={
                <>
                    <button className={modalStyles.cancelButton} onClick={closeModal}>Cancel</button>
                    <button
                        className={modalStyles.confirmButton}
                        onClick={() => {
                            handleExit(); // Execute exit logic upon confirmation
                        }}
                    >
                        Confirm
                    </button>
                </>
            }
        />

        <Modal
            isOpen={BuySuccessModal}
            onClose={closeModal}
            title="Purchase Successful"
            content={<p>Your purchase has been confirmed!</p>}
            footerActions={
            <>
                <button className={modalStyles.cancelButton} onClick={closeModal}>Close</button>
            </>
            }
        />

        <Modal
            isOpen={SellSuccessModal}
            onClose={closeModal}
            title="Sell Successful"
            content={<p>Your coin was sold successfully!</p>}
            footerActions={
            <>
                <button className={modalStyles.cancelButton} onClick={closeModal}>Close</button>
            </>
            }
        />

        <Modal2 
            isOpen={isLoseModalOpen}
            onClose={closeLoseModal}
            title="YOU LOST"
            content={<p>You ran out of dummy cash!</p>}
            footerActions={
                <>
                    <button className={modalStyles.cancelButton} onClick={closeLoseModal}>Exit</button>
                    <button className={modalStyles.confirmButton} onClick={closeLoseModal}>Try Again</button>
                </>
            }
        />

        <Modal2 
            isOpen={isInvestmentModalOpen}
            onClose={closeInvestmentModal}
            title="Invest first!"
            content={<p>You have no active investments with this coin.</p>}
            footerActions={
                <>
                    <button className={modalStyles.cancelButton} onClick={closeInvestmentModal}>Exit</button>
                </>
            }
        />

        <Modal3
            isOpen={isErrorModalOpen}
            onClose={closeErrorModal}
            title="Transaction Unsuccessful!"
            content={<p>You can't purchase this coin. You have insufficient balance!</p>}
            footerActions={
            <>
                <button className={modalStyles.cancelButton} onClick={closeErrorModal}>Close</button>
            </>
            }
        />

        <Modal3
        isOpen={isBuyModalOpen}
        onClose={closeBuyModal}
        title="Transaction Successful!"
        content={
            <div>
            <p>Successfully purchased {selectedCoin?.name}!</p>
            <p>You invested ${(quantity * (selectedCoin?.quote?.USD?.price || 0)).toFixed(2)}.</p>
            </div>
        }
        footerActions={
            <>
            <button className={modalStyles.cancelButton} onClick={closeBuyModal}>Close</button>
            </>
        }
        />   

        <Modal3
        isOpen={isSellModalOpen}
        onClose={closeSellModal}
        title="Transaction Successful!"
        content={
            <div>
            <p>Successfully sold {selectedCoin?.name}!</p>
            <p>You exited your position with a {profitOrLoss >= 0 ? 'profit' : 'loss'} of ${profitOrLoss.toFixed(2)}!</p>
            </div>
        }
        footerActions={
            <>
            <button className={modalStyles.cancelButton} onClick={closeSellModal}>Close</button>
            </>
        }
        />

        <RestartModal
            isOpen={isRestartModalOpen}
            onClose={closeRestartModal}
            title="Transaction Unsuccessful!"
            content={<p>Do you want to restart your progress?</p>}
            footerActions={
            <>
                <button className={modalStyles.cancelButton} onClick={closeRestartModal}>Close</button>
                <button className={modalStyles.confirmButton} onClick={confirmRestart} >Confirm</button>
            </>
            }
        />

      
            <div className={styles.pageContainer} id='modal-root'>
                <img  src={gradient1.src} className={styles.gradient1}></img>
                <div className={styles.topContainer}>
                    <div className={styles.leftPanel}>
                            <h1 className={styles.titleHeader}>Virtual Trading</h1> 
                            
                        <div className={styles.topGroup}>
                        <div className={styles.dummyCashContainer}>
                            <h1 className={styles.header1}>Available Dummy Cash</h1>
                            
                                <h1 className={styles.header2}>
                                    ${new Intl.NumberFormat('en-US', { className: 'currency', currency: 'USD' }).format(dummyCash)}
                                </h1>
                               
                         </div>
                            <div className={styles.buttonGroup}>
                            
                            <button className={styles.howToPlay} onClick={openTutorModal}>
                                How to Play <IoMdHelpCircleOutline className={styles.tutorialIcon} />
                            </button>

                            <TutorialModal isOpen={isTutorModalOpen} onClose={closeTutorModal} />
                            
                                <button
                                 className={`${styles.button1} ${isHovered2 ? styles.button1Hover : ''}`}
                                onMouseEnter={() => setIsHovered2(true)}
                                onMouseLeave={() => setIsHovered2(false)}
                                onClick={() =>handlePanelSwitch('panel2')}
                                
                                >Coin List</button>


                                <button
                                className={`${styles.button1} ${isHovered1 ? styles.button1Hover : ''}`}
                                onMouseEnter={() => setIsHovered1(true)}
                                onMouseLeave={() => setIsHovered1(false)}
                                onClick={() =>handlePanelSwitch('panel1')}
                                
                                >Ongoing Investments</button>

                                <button
                                 className={`${styles.button1} ${isHovered3 ? styles.button1Hover : ''}`}
                                onMouseEnter={() => setIsHovered3(true)}
                                onMouseLeave={() => setIsHovered3(false)}
                                onClick={() =>handlePanelSwitch('panel3')}
                                
                                >Trade Log</button>
                            
                            <button className={styles.howToPlay} onClick={openRestartModal}>Restart</button>

                          

                            </div>


                        </div>

                        <div className={styles.coinPanel}>
                            {activePanel === 'panel1' && <div className={styles.cardContainer}> 
                                {investments.length === 0 ? (
                                    // Display this message if there are no investments
                                    <p className={styles.header2}>You haven't invested in any coins yet. Start by selecting a coin and entering an amount to invest!</p>
                                ) : (
                                    // Map through investments and display a card for each
                                    investments.map((investment, index) => (
                                        <Card key={investment.id || index}>
                                            <h1 className={styles.header3}>{investment.name}</h1>
                                            <span className={styles.smallcard}>{investment.symbol}</span>
                                            <img 
                                                src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${investment.id}.png`} 
                                                alt={`${investment.name} logo`} 
                                                className={styles.coinPlaceHolder} 
                                            />
                                            <div className={styles.priceGroup}>
                                                <h1 className={styles.header2}>${investment.pricePHP.toFixed(2)}</h1>
                                                <h1 className={styles.header1}>Current Price (PHP)</h1>
                                            </div>
                                            <div className={styles.priceGroup}>
                                                <h1 className={styles.header2}>{investment.totalCost.toFixed(2)}</h1>
                                                <h1 className={styles.header1}>Total Cost</h1>
                                            </div>
                                            <div className={styles.profitGroup}>
                                                <span className={styles.smallcard2}>
                                                    {investment.profit >= 0 ? <IoMdTrendingUp className={styles.trendingUp} /> : <IoMdTrendingDown className={styles.trendingDown} />}
                                                    {investment.profit.toFixed(1)}%
                                                </span>
                                                <h1 className={styles.header1}>% Profit</h1>
                                            </div>
                                        </Card>
                                    ))
                                )}
                            </div>}

                            {activePanel === 'panel2' && <div>
                                <div className={styles.tableContainer}>
                                    <table className={styles.table}>
                                        <thead>
                                        <tr>
                                            <th className={styles.tableHeader}>Coin Name</th>
                                            <th className={styles.tableHeader}>Symbol</th>
                                            <th className={styles.tableHeader}>Price (PHP)</th>
                                            <th className={styles.tableHeader}>1h Change (%)</th>
                                            <th className={styles.tableHeader}>24h Change (%)</th>
                                            <th className={styles.tableHeader}>7d Change (%)</th>
                                            <th className={styles.tableHeader}>Volume (24h)</th>
                                            <th className={styles.tableHeader}>Market Cap (in Trillions)</th>
                                            <th className={styles.tableHeader}>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {currentItems.map((id) => {
                                            const coin = cryptoData[id];
                                            const pricePHP = formatNumberWithCommas((coin.quote.USD.price).toFixed(2)); // Adjust multiplier as needed
                                            const marketCapT = formatNumberWithCommas((coin.quote.USD.market_cap / 1e12).toFixed(2)); // Convert to trillions
                                            const volume24hPHP = formatNumberWithCommas((coin.quote.USD.volume_24h).toFixed(2));

                                            return (
                                            <tr key={id}>
                                                <td className={styles.tableCell}>
                                                    {coin.name} 
                                                    <img 
                                                        src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${coin.id}.png`} 
                                                        alt={`${coin.name} logo`} 
                                                        className={styles.logo} 
                                                    />
                                                </td>
                                                <td className={styles.tableCell}>{coin.symbol}</td>
                                                <td className={styles.tableCell}>${pricePHP}</td>
                                                <td className={styles.tableCell}>
                                                    <span className={coin.quote.USD.percent_change_1h < 0 ? styles.changeNegative : styles.changePositive}>
                                                        {coin.quote.USD.percent_change_1h.toFixed(2)}%
                                                    </span>
                                                </td>
                                                <td className={styles.tableCell}>
                                                    <span className={coin.quote.USD.percent_change_24h < 0 ? styles.changeNegative : styles.changePositive}>
                                                        {coin.quote.USD.percent_change_24h.toFixed(2)}%
                                                    </span>
                                                </td>
                                                <td className={styles.tableCell}>
                                                    <span className={coin.quote.USD.percent_change_7d < 0 ? styles.changeNegative : styles.changePositive}>
                                                        {coin.quote.USD.percent_change_7d.toFixed(2)}%
                                                    </span>
                                                </td>
                                                <td className={styles.tableCell}>₱{volume24hPHP}</td>
                                                <td className={styles.tableCell}>₱{marketCapT} T</td>

                                                <td className={styles.tableCell}>
                                                <button className={styles.button4} onClick={() => handleViewClick(coin)}>SELECT</button>
                                                </td>
                                            </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>

                                    
                                </div>

                                <div className={styles.pagination}>
                                        <button className={styles.button4} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                                        Previous
                                        </button>
                                        <span>Page {currentPage} of {totalPages}</span>
                                        <button className={styles.button4} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                                        Next
                                        </button>
                                </div>
                            </div>
                             }

                            {activePanel === 'panel3' && (
                                <>
                                    {orderHistory.length > 0 ? (
                                        <div className={styles.tableContainer}>
                                            <table className={styles.table}>
                                                <thead>
                                                    <tr>
                                                        <th className={styles.tableHeader}>Coin Name</th>
                                                        <th className={styles.tableHeader}>Symbol</th>
                                                        <th className={styles.tableHeader}>Quantity</th>
                                                        <th className={styles.tableHeader}>Price at Entry (USD)</th>
                                                        <th className={styles.tableHeader}>Price at Exit (USD)</th>
                                                        <th className={styles.tableHeader}>% Profit</th>
                                                        <th className={styles.tableHeader}>Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orderHistory.map((order, index) => (
                                                        <tr key={index}>
                                                            <td className={styles.tableCell}>
                                                                {order.coinName}
                                                                <img 
                                                                    src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${order.coinId}.png`} 
                                                                    alt={`${order.coinName} logo`} 
                                                                    className={styles.logo} 
                                                                />
                                                            </td>
                                                            <td className={styles.tableCell}>{order.symbol}</td>
                                                            <td className={styles.tableCell}>{order.quantity}</td>
                                                            <td className={styles.tableCell}>₱{formatNumberWithCommas(order.priceAtEntry.toFixed(2))}</td>
                                                            <td className={styles.tableCell}>₱{formatNumberWithCommas(order.priceAtExit.toFixed(2))}</td>
                                                            <td className={styles.tableCell}>
                                                                <span className={order.profitPercent >= 0 ? styles.changePositive : styles.changeNegative}>
                                                                    {order.profitPercent.toFixed(2)}%
                                                                </span>
                                                            </td>
                                                            <td className={styles.tableCell}>{new Date(order.date).toLocaleDateString()}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className={styles.emptyPanel}>
                                            <h1 className={styles.header2}>
                                                You haven't invested in any coins yet. Start by selecting a coin and entering an amount to invest!
                                            </h1>
                                        </div>
                                    )}
                                </>
                            )}

                        </div>
                    </div>
                    <div className={styles.rightCard}>
                    {selectedCoin.id === null ? (
                        <div className="flex items-center justify-center h-screen p-8">
                            <p className="text-center text-lg p-4 rounded">
                                <RiCoinsFill className={styles.logoLarge2} />
                                Select a coin to view its details.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.upperGroup}>
                                <img 
                                    src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${selectedCoin.id}.png`} 
                                    alt={`${selectedCoin.name} logo`} 
                                    className={styles.logoLarge} 
                                />
                                <div className={styles.leftUpper}>
                                    <h1 className={styles.header4}>${formatNumberWithCommas(coinPrice.toFixed(2))}</h1>
                                    <h1 className={styles.header5}>{selectedCoin.name}</h1>
                                </div>
                                <span className={styles.smallRightcard}>
                                    {selectedCoin?.quote?.USD?.percent_change_1h >= 0 ? (
                                        <IoMdTrendingUp className={styles.trendingUp} />
                                    ) : (
                                        <IoMdTrendingDown className={styles.trendingDown} />
                                    )}
                                    <span 
                                        style={{
                                            color: selectedCoin?.quote?.USD?.percent_change_1h >= 0 ? 'green' : 'red'
                                        }}
                                    >
                                        {selectedCoin?.quote?.USD?.percent_change_1h?.toFixed(2) ?? 'N/A'}%
                                    </span>
                                </span>
                            </div>

                            {/* Ensure the widget is shown only when symbol is set */}
                            <div className={styles.widgetContainer}>
                                {selectedCoin.id !== null && selectedCoin.symbol && (
                                    <TradingViewWidget className={styles.widget1} symbol={selectedCoin.symbol} />
                                )}
                            </div>

                            <div className={styles.middleGroup}>    
                                <div className={styles.flexContainer}>
                                    <span className={styles.dataGroup}>
                                        <h3 className={styles.header7}>Market Cap</h3>
                                        <h1 className={styles.header8}>
                                            {selectedCoin?.quote?.USD?.market_cap
                                                ? `${formatNumberWithCommas((selectedCoin.quote.USD.market_cap / 1e12).toFixed(2))} T`
                                                : 'N/A'}
                                        </h1>
                                    </span>
                                    <span className={styles.dataGroup}>
                                        <h3 className={styles.header7}>24h Volume</h3>
                                        <h1 className={styles.header8}>
                                            {selectedCoin?.quote?.USD?.volume_24h
                                                ? `${formatNumberWithCommas((selectedCoin.quote.USD.volume_24h / 1e12).toFixed(2))} T`
                                                : 'N/A'}
                                        </h1>
                                    </span>
                                    <span className={styles.dataGroup}>
                                        <h3 className={styles.header7}>Circulating Supply</h3>
                                        <h1 className={styles.header8}>{formatNumberWithCommas(selectedCoin.circulating_supply)}</h1>
                                    </span>
                                </div>

                                <div className={styles.qtyGroup}>
                                    <label className={styles.header2} htmlFor="quantity">Coin Quantity</label><br />
                                    <input 
                                        type="number" 
                                        id="quantity" 
                                        name="quantity" 
                                        className={styles.inputField} 
                                        placeholder="Enter quantity" 
                                        min="0"
                                        value={quantity} // Controlled input
                                        onChange={handleQuantityChange} // Update state on change
                                    />
                                </div>
                                <br />
                            </div>

                            <div className={styles.cardButtonGroup}>
                                <button className={styles.Button2} onClick={handleEntry}>
                                    Enter
                                </button>
                                <button className={styles.Button3} onClick={() => openSpecificModal('modal2')}>
                                    Exit
                                </button>
                            </div>
                        </>
                    )}
                </div>
                </div>
                <div className={styles.bottomContainer}>
                    <h1 className={styles.header3}>Total</h1>
                    <div className={styles.totalRightPanel}>
                        <div className={styles.totalPriceGroup}>
                            <h1 className={styles.header6}>Average Price</h1>
                            <h1 className={styles.header2}>0.0</h1> 
                        </div>
                        <div className={styles.totalPriceGroup}>
                            <h1 className={styles.header6}>Total Cost</h1>
                            <h1 className={styles.header2}>0.0</h1> 
                        </div>
                        <div className={styles.profitGroup2}>
                            <h1 className={styles.header6}>Total Cost</h1>
                            <span className={styles.smallcard2}><IoMdTrendingDown className={styles.trendingDown}></IoMdTrendingDown> -0.1</span>
                            
                        </div>
                        <div className={styles.profitGroup2}>
                            <h1 className={styles.header6}>% Profit</h1>
                            <span className={styles.smallcard2}><IoMdTrendingDown className={styles.trendingDown}></IoMdTrendingDown> -0.1</span>
                        </div>
                    </div>
                </div>

                {/* for lose and error modal previews */}
                <div className={styles.tableContainer}>
                    
                 </div>
           </div>
        </Layout>
    )
}

