// @/components/HeroPage.js
import React from 'react';
import styles from 'styles/HomePage.module.css';

export default function HeroPage({ title, subtitle, buttonText, buttonLink }) {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <a href={buttonLink} className={styles.heroButton}>
          {buttonText}
        </a>
      </div>
    </div>
  );
}
