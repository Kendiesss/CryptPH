import { useState, useEffect } from 'react';
import styles from '@/styles/tutorialGuide.module.css';

const TutorialGuide = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      element: '.coin-list-button',
      title: 'Step 1: Choosing a Coin',
      description:
        'Click the "Coin List" button to view all available cryptocurrencies. Select a coin to view its details, price, and trends.',
    },
    {
      element: '.ongoing-investments-button',
      title: 'Step 2: Monitoring & Exiting',
      description:
        'Use the "Ongoing Investments" button to monitor your current portfolio. From here, you can sell coins to cash out profits.',
    },
    {
      element: '.trade-log-button',
      title: 'Step 3: Viewing Your Trade Log',
      description:
        'Click "Trade Log" to review your past trades and assess your performance. Learn from your profits and losses!',
    },
    {
      element: '.restart-button',
      title: 'Step 4: Restarting Your Game',
      description:
        'Click the "Restart" button to reset your progress and dummy cash. This will allow you to start over with a fresh balance.',
    },
    {
      element: null,
      title: 'Congratulations!',
      description: 'You’ve completed the tutorial! Start trading and grow your virtual portfolio!',
    },
  ];

  useEffect(() => {
    let targetElement = null;

    if (isOpen && currentStep < steps.length) {
      const step = steps[currentStep];
      targetElement = step.element ? document.querySelector(step.element) : null;

      if (targetElement) {
        targetElement.classList.add('highlight');
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return () => {
      if (targetElement) {
        targetElement.classList.remove('highlight');
      }
    };
  }, [currentStep, isOpen]);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleTutorialFinish();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTutorialFinish = () => {
    setCurrentStep(0); // Reset to the beginning
    onClose(); // Close the tutorial
  };

  if (!isOpen) return null;

  const current = steps[currentStep];
  const targetElement = current.element ? document.querySelector(current.element) : null;
  const targetPosition = targetElement ? targetElement.getBoundingClientRect() : null;

  return (
    <div className={styles.tutorialOverlay}>
      {targetPosition && (
        <div
          className={`${styles.tooltip} ${currentStep === steps.length - 1 ? styles.congrats : ''}`}
          style={{
            top: targetPosition.top + window.scrollY + targetPosition.height + 10,
            left: targetPosition.left + targetPosition.width / 2,
          }}
        >
          <div className={styles.arrow}></div>
          <h3>{current.title}</h3>
          <p>{current.description}</p>
          <div className={styles.buttons}>
            {currentStep > 0 && (
              <button className={styles.navButton} onClick={goToPreviousStep}>
                Previous
              </button>
            )}
            <button className={styles.navButton} onClick={goToNextStep}>
              {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>
      )}
      {!targetElement && (
        <div className={`${styles.centeredTooltip} ${currentStep === steps.length - 1 ? styles.blackText : ''}`}>
          <h3>{current.title}</h3>
          <p>{current.description}</p>
          <button className={styles.navButton} onClick={handleTutorialFinish}>
            Finish
          </button>
        </div>
      )}
    </div>
  );
};

export default TutorialGuide;
