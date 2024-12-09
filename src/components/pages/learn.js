import Head from 'next/head';
import Layout from '../Layout';
import pholder from '@/img/placeholder-learn.png';
import learn from '@/img/learn.png';
import { FaPlay } from "react-icons/fa";
import gradient1 from '@/img/gradient-1.png';
import gradient2 from '@/img/gradient-2half.png';
import React, { useState, useEffect } from 'react'; 
import styles from '@/styles/learn.module.css'; 
import { ClipLoader } from 'react-spinners';
import Link from 'next/link';

const Card = ({ image, title, description }) => {
    const [isHovered, setIsHovered] = useState(false);

    const stripHtmlAndTruncate = (str = "", length = 200) => {
        if (!str) return "";  // Return an empty string if str is undefined or null
        const cleanString = str.replace(/<\/?[^>]+(>|$)/g, ""); // Removes HTML tags
        if (cleanString.length <= length) return cleanString;
        return cleanString.substring(0, length) + "..."; // Truncates and adds ellipsis
    };

    return (
        <div
            className={`${styles.card} ${isHovered ? styles.cardHover : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.cardLeft}>
                <img src={image || pholder.src} className={styles.courseImage} alt="Course" />
            </div>
            <div className={styles.cardRight}>
                <h1 className={styles.cardTitle}>{title}</h1>
                <p className={styles.cardDesc}>{stripHtmlAndTruncate(description)}</p>
                <button className={styles.cardButton}>
                    Learn<FaPlay className={styles.playIcon} />
                </button>
            </div>
        </div>
    );
};

export default function HeroPage() {
    const [newsItems, setNewsItems] = useState([]);
    const [showAll, setShowAll] = useState(false); 
    const [loading, setLoading] = useState(true);  

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);  
        }, 5000); //FALSE DELAY

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news/fetch?category=Education');
                const data = await response.json();
                setNewsItems(data);
            } catch (error) {
                console.error("Error fetching news items:", error);
            }
        };

        fetchNews();
    }, []);

    const displayedItems = showAll ? newsItems : newsItems.slice(0, 4); 

    return (
        <Layout pageTitle="Learn">
            <div className={styles.pageContainer}>
                <div className={styles.mainContainer}>
                    <div className={styles.heroContainer}>
                        <div className={styles.contentContainer}>
                            <h1 className={styles.title}>Login Now to <br />Learn <br /> Crypto Trading</h1>
                        </div>
                        <div className={styles.imageContainer}>
                            <img src={learn.src} className={styles.image} />
                        </div>
                    </div>

                    <div className={styles.gradient1} style={{ backgroundImage: `url(${gradient1.src})` }}></div>
                    <div className={styles.gradient2} style={{ backgroundImage: `url(${gradient2.src})` }}></div>

                    <div className={styles.coursesContainer}>
                    <div className={styles.coursesHeader}>
                        <h1 className={styles.sectionTitle}>Popular Articles</h1>
                        {/*SPINNER WHEN CONTENT LOADS*/}
                        {!loading && (
                            <h1
                                className={styles.sectionText}
                                onClick={() => setShowAll(!showAll)}
                                style={{ cursor: 'pointer' }}
                            >
                                {showAll ? 'Show less' : 'See all'} <span className={styles.arrow}>→</span>
                            </h1>
                        )}
                    </div>
                        <div className={styles.cardGrid}>
                        {loading ? (
                        <div className={styles.spinnerWrapper}>
                            <ClipLoader size={50} color="#3498db" loading={loading} />
                        </div>
                    ) : (
                        displayedItems.length > 0 ? (
                            displayedItems.map((newsItem) => (
                                <Link key={newsItem._id} href={`/educational/${newsItem._id}`} passHref>
                                    <div className={styles.cardWrapper}>
                                        <Card
                                            image={newsItem.image}
                                            title={newsItem.title}
                                            description={newsItem.description}
                                        />
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No articles available at the moment.</p>
                        )
                    )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
