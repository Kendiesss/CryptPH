// @/components/HeroPage.js

import Head from 'next/head';
import Link from 'next/link'; 
import Layout from '../Layout/adminIndex';
import styles from '@/styles/adminDashboard.module.css'; // Importing CSS module
import React, { useEffect, useState } from 'react';
import { FiBarChart, FiBook, FiDatabase} from "react-icons/fi";
import { MdOutlineNewspaper } from "react-icons/md";
import { FaExchangeAlt, FaUsersCog } from "react-icons/fa";

export default function HeroPage() {
    const AdminDashboard = () => {
        // State to hold the current time and date
        const [currentTime, setCurrentTime] = useState(new Date());
    
        // Function to update the current time every second
        useEffect(() => {
          const timer = setInterval(() => {
            setCurrentTime(new Date());
          }, 1000);
    
          // Cleanup the interval on component unmount
          return () => clearInterval(timer);
        }, []);
    
        // Formatting the time and date
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? `0${minutes}` : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        const formattedDate = currentTime.toLocaleDateString('en-PH', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });

    return (
      <div className={styles.adminDashboard}>
        <div className={styles.adminGreetingSection}>
          <h1 className={styles.header1}>Admin Dashboard</h1>
          <div className={styles.adminClockDisplay}>
            <h2 className={styles.adminClockTime}>{formattedTime}</h2>
            <p className={styles.adminClockDate}>{formattedDate}</p>
          </div>
          <div className={styles.adminStatsSection}>
            <div className={styles.adminStatBox}>
              <h3 className={styles.adminStatNumber}>10</h3>
              <p className={styles.p1}>Educational Articles</p>
            </div>
            <div className={styles.adminStatBox}>
              <h3 className={styles.adminStatNumber}>10</h3>
              <p className={styles.p1}>News</p>
            </div>
            <div className={styles.adminStatBox}>
              <h3 className={styles.adminStatNumber}>10</h3>
              <p className={styles.p1}>Users</p>
            </div>
          </div>
        </div>
        <div className={styles.adminNavigationSection}>
          <h2 className={styles.adminNavigationTitle}>Navigate and Manage</h2>
          <div className={styles.adminButtonGroup}>
            <button className={styles.adminButton}>
                <Link href="/charts" passHref>
                    <FiBarChart className={styles.icon} /> Charts
                </Link>
            </button>
            <button className={styles.adminButton}>
                <Link href="/virtual-trading" passHref>
                    <FaExchangeAlt className={styles.icon} /> Virtual Trading
                </Link>
            </button>
            <button className={styles.adminButton}>
                <Link href="/news" passHref>
                    <MdOutlineNewspaper className={styles.icon} /> News
                </Link>
            </button>
            <button className={styles.adminButton}>
                <Link href="/manageUsers" passHref>
                    <FaUsersCog className={styles.icon} /> Users
                </Link>
            </button>
            <button className={styles.adminButton}>
                <Link href="/learn" passHref>
                    <FiBook className={styles.icon} /> Learn
                </Link>
            </button>
            <button className={styles.adminButton}>
                <Link href="/manageContents" passHref>
                    <FiDatabase className={styles.icon} /> Contents
                </Link>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout pageTitle="Admin Dashboard">
      <Head>
      </Head>
      <AdminDashboard />
    </Layout>
  );
}
