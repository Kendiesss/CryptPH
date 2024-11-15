// components/restartModal.js
import React from 'react';
import ReactDOM from 'react-dom';
import styles from '@/styles/modal.module.css';

const RestartModal = ({ isOpen, onClose, title, content, footerActions }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        {title && <h2 className={styles.modalTitle}>{title}</h2>}
        <div className={styles.modalBody}>{content}</div>
        <div className={styles.modalFooter}>{footerActions}</div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default RestartModal;
