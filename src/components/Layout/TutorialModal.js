import { useState } from 'react';
import styles from '@/styles/tutorialModal.module.css';
import { IoMdHelpCircleOutline } from 'react-icons/io';

const TutorialModal = ({ isOpen, onClose }) => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { title: 'Introduction', content: 'Welcome to the tutorial! This guide will walk you through the basics.' },
    { title: 'Step 1', content: 'In this step, you’ll learn how to set up your project.' },
    { title: 'Step 2', content: 'This section covers the main features you’ll be working with.' },
    { title: 'Step 3', content: 'You’re all set! Good luck with your project.' },
  ];

  const goToNextSection = () => {
    if (currentSection < sections.length - 1) setCurrentSection(currentSection + 1);
  };

  const goToPreviousSection = () => {
    if (currentSection > 0) setCurrentSection(currentSection - 1);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles.modalTitle}>{sections[currentSection].title}</h2>
        <p className={styles.modalParagraph}>{sections[currentSection].content}</p>

        <div className={styles.navigationButtons}>
          <button
            className={styles.navButton}
            onClick={goToPreviousSection}
            disabled={currentSection === 0}
          >
            Previous
          </button>
          <button
            className={styles.navButton}
            onClick={goToNextSection}
            disabled={currentSection === sections.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
