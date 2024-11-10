import { useState } from 'react';
import styles from '@/styles/tutorialModal.module.css';
import { IoMdHelpCircleOutline, IoMdCash, IoMdTrendingUp, IoMdCheckmarkCircleOutline } from 'react-icons/io';

const TutorialModal = ({ isOpen, onClose }) => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      title: 'Welcome to CryptPH!',
      icon: <IoMdHelpCircleOutline className={styles.icon} color="#007bff" />,
      content: `CryptPH is a virtual trading game where you can invest in various cryptocurrencies using a virtual budget that helps you increase your knowledge about Cryptocurrencies and Trading. Let's get started!`
    },
    {
      title: 'Step 1: Choosing a Coin',
      icon: <IoMdCash className={styles.icon}  color="#28a745" />,
      content: `In order to get started, click the Coin List button to view the list of available coins, and click SELECT to view its details, including price, market cap, and trends. Once you find a coin you're interested in, decide on the quantity you'd like to buy based on your available cash balance.`
    },
    {
      title: 'Step 2: Monitoring & Exiting',
      icon: <IoMdTrendingUp className={styles.icon} color="#ffc107" />,
      content: `Track your portfolio in real-time. Use the Ongoing Investments button to view your currently invested coins and decide when to exit a position by analyzing the data presented. Selling a coin will add the value back to your cash balance.Go aim for those profits!`
    },
    {
      title: 'Congratulations!',
      icon: <IoMdCheckmarkCircleOutline className={styles.icon} color="#17a2b8" />,
      content: `You've completed the tutorial! Start exploring the game, choose from a wide variety of virtual coins, and see how much you can grow your virtual portfolio. You can view your Trade Log to see your previous investments on whether you profited or not.`
    }
  ];

  const goToNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      onClose(); // Close the modal when tutorial is finished
    }
  };

  const goToPreviousSection = () => {
    if (currentSection > 0) setCurrentSection(currentSection - 1);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>

        <h2 className={styles.modalTitle}>{sections[currentSection].title}</h2>

        <div className={styles.iconContainer}>{sections[currentSection].icon}</div>

        <p className={styles.modalParagraph}>{sections[currentSection].content}</p>

        <div className={styles.navigationButtons}>
        {/* Render Previous button only if it's not the first section */}
        {currentSection > 0 && (
          <button
            className={styles.navButton}
            onClick={goToPreviousSection}
          >
            Previous
          </button>
        )}

        {/* Render Next button only if it's not the last section */}
        {currentSection < sections.length - 1 && (
          <button
            className={styles.navButton}
            onClick={goToNextSection}
          >
            Next
          </button>
        )}
      </div>
      </div>
    </div>
  );
};

export default TutorialModal;
