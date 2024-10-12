import Head from 'next/head';
import Link from 'next/link';
import Layout from '../Layout/adminIndex';
import gradient4 from '@/img/gradient-4.png';
import { FiUsers } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoNewspaperOutline } from "react-icons/io5";
import { HiOutlineTrendingUp } from "react-icons/hi";
import React, { useState } from 'react';
import styles from '@/styles/adminDashboard.module.css'; // Import the CSS module

const Card = ({ children, link }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={link}>
            <div
                className={`${styles.card} ${isHovered ? styles.cardHover : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {children}
            </div>
        </Link>
    );
};

export default function HeroPage() {
    return (
        <Layout pageTitle="Dashboard">
            <Head>
            </Head>

            <div className={styles.pageContainer}>
            <img src={gradient4.src} className={styles.gradient3} alt="Gradient Background" />
                <div className={styles.cardsContainer}>
                    <Card link={"/admin-dashboard"}>
                        <div className={styles.cardHeader}>
                            <h1 className={styles.cardTitle}>Dashboard</h1>
                            <AiOutlineDashboard className={styles.icon} />
                        </div>
                    </Card>

                    <Card link={"/admin-dashboard"}>
                        <div className={styles.cardHeader}>
                            <h1 className={styles.cardTitle}>Users</h1>
                            <FiUsers className={styles.icon} />
                        </div>
                    </Card>

                    <Card link={"/admin-dashboard"}>
                        <div className={styles.cardHeader}>
                            <h1 className={styles.cardTitle}>Profile</h1>
                            <FiUser className={styles.icon} />
                        </div>
                    </Card>

                    <Card link={"/manageContents"}>
                        <div className={styles.cardHeader}>
                            <h1 className={styles.cardTitle}>Contents</h1>
                            <FaRegBookmark className={styles.icon} />
                        </div>
                    </Card>

                    <Card link={"/news"}>
                        <div className={styles.cardHeader}>
                            <h1 className={styles.cardTitle}>News</h1>
                            <IoNewspaperOutline className={styles.icon} />
                        </div>
                    </Card>

                    <Card link={"/charts"}>
                        <div className={styles.cardHeader}>
                            <h1 className={styles.cardTitle}>Charts</h1>
                            <HiOutlineTrendingUp className={styles.icon} />
                        </div>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
