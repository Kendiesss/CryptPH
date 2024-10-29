// components/Modal.js
import React from 'react';
import ReactDOM from 'react-dom';
import styles from '@/styles/modal.module.css';
import loseIcon from '@/img/loseIcon.png';

const Modal2 = ({ isOpen, onClose, title, content, footerActions }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        {title && <h2 className={styles.modalTitle}>{title}</h2>}
        <div className={styles.modalBody}>
            
                <img src={loseIcon.src} className={styles.icon}></img>
            
        {content}  
        </div>
        <div className={styles.modalFooter}>{footerActions}</div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal2;
