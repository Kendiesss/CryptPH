import React from 'react';
import styles from '@/styles/SellConfirmModal.module.css';
import TradingViewWidget from '../pages/TradingViewWidget'; // Adjust the path accordingly

const SellConfirmModal = ({ isOpen, onClose, details, onConfirm }) => {
    if (!isOpen) return null;

    if (!details) return null;
    console.log("Modal props:", { isOpen, details });

    const { coinName, coinSymbol, quantityToExit, coinId, coinPrice } = details;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>Confirm Sale</h2>
                    <button className={styles.closeButton} onClick={onClose}>X</button>
                </div>

                <div className={styles.modalContent}>
                    {/* Coin Image and Details */}
                    <div className={styles.upperGroup}>
                        <div className={styles.leftUpper}>
                        <h1 className={styles.header4}>${coinPrice.toFixed(2)}</h1>
                        <h1 className={styles.header5}>{coinName}</h1>
                        </div>
                        <p>Are you sure you want to sell {quantityToExit} of {coinName} ({coinSymbol})?</p>
                        <p>This action is irreversible. Please confirm your decision.</p>
                    </div>

                    {/* Chart Section */}
                    <div className={styles.chartContainer}>
                        {coinSymbol && (
                            <TradingViewWidget
                                symbol={coinSymbol}
                                interval="D" // Daily interval
                                theme="light" // Light or dark theme
                                autosize
                            />
                        )}
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
                    <button 
                        className={styles.confirmButton} 
                        onClick={() => { 
                            onConfirm(); 
                            onClose(); 
                        }}
                    >
                        Confirm Sale
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SellConfirmModal;
