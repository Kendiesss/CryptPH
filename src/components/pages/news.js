import Head from 'next/head';
import pholder from '@/img/placeholder-learn.png';
import { FaArrowCircleRight, FaClock } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import styles from '@/styles/news.module.css'; // Import the CSS module

// Card component for individual news items
const Card = ({ image, title, date }) => (
    <div className={styles.newsCardSmall}>
        <img src={image} className={styles.image2} alt={title} />
        <div className={styles.headlineGrp}>
            <h1 className={styles.headlineSmall}>{title}</h1>
            <h1 className={styles.datePublished}>
                <span className={styles.iconWrapper}><FaClock className={styles.icon2} /></span>
                {formatDate(date)}
            </h1>
        </div>
    </div>
);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); // Returns 'YYYY-MM-DD'
};

export default function DummyPage({ title }) {
    const [newsItems, setNewsItems] = useState([]); 

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news/fetch?category=News'); 
                const data = await response.json();
                setNewsItems(data); 
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, []); 

    return (
        <Layout pageTitle={title}>
            <div className={styles.pageContainer}>
                <div className={styles.upperPanel}>
                    <div className={styles.carouselWrapper}>
                        <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000} showStatus={false}>
                            <div className={styles.newsCard}>
                                <div className={styles.detailsGrp}>
                                    <div className={styles.imageBackground} style={{ backgroundImage: `url(${pholder.src})` }}></div>
                                    <h1 className={styles.headlineLarge}>News Headline</h1>
                                    <button className={styles.button1}>
                                        Read More
                                        <span className={styles.iconWrapper}>
                                            <FaArrowCircleRight className={styles.icon} />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </div>
                <div className={styles.lowerPanel}>
                    <div className={styles.headerGrp}>
                        <h1 className={styles.title}>More News</h1>
                        <Link href="/news" passHref>
                            <button className={styles.seeAll}>See All</button>
                        </Link>
                    </div>
                    <div className={styles.cardContainer}>
                        {newsItems.map((item) => (
                            <Link key={item._id} href={`/news/${item._id}`} passHref>
                                <div className={styles.cardWrapper}>
                                    <Card image={item.image || pholder.src} title={item.title} date={item.date} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
