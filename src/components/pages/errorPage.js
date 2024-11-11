// @/components/pages/ErrorPage.js
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../Layout/adminIndex';
import styles from '@/styles/errorPage.module.css';
import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';


export default function ErrorPage() {
  return (
    <Layout pageTitle="Error">
      <Head>
        <title>Error!</title>
      </Head>
      <div className={styles.heroContainer}>
        <div className={styles.gradient1}></div>
        <div className={styles.gradient2}></div>
        
        <div className={styles.errorContent}>
          <FiAlertTriangle className={styles.errorIcon} />
          <h1 className={styles.errorTitle}>Oops! Something went wrong!</h1>
          <p className={styles.errorMessage}>
            We couldn't load the page you were looking for.
          </p>
          <Link href="/">
            <button className={styles.errorButton}>Home</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
