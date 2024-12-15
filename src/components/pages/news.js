import Head from 'next/head';
import pholder from '@/img/placeholder-learn.png';
import { FaArrowCircleRight, FaClock } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import styles from '@/styles/news.module.css'; // Import the CSS module
import { ClipLoader } from 'react-spinners';


const truncate = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Card = ({ image, title, date }) => (
    <div className={styles.newsCardSmall}>
        <img src={image} className={styles.image2} alt={title} />
        <div className={styles.headlineGrp}>
            <h1 className={styles.headlineSmall}>{truncate(title, 50)}</h1>
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
    const [showAll, setShowAll] = useState(false); //see all
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/contents/fetch?category=News'); 
                const data = await response.json();
                setNewsItems(data); 
            } catch (error) {
                console.error("Error fetching news:", error);
                setLoading(false); 
            }
        };

        fetchNews();
    }, []); 

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);  
        }, 2000); //FALSE DELAY

        return () => clearTimeout(timer);
    }, []);

     // Limit the carousel to the top 5 news items
    const topNewsItems = newsItems.slice(0, 5); // Show only the first 5 items in the carousel
    const displayedItems = showAll ? newsItems : newsItems.slice(0, 12); //Show 12 news items at startup

    return (
        <Layout pageTitle={title}>
            <div className={styles.pageContainer}>
                <div className={styles.upperPanel}>
                    <div className={styles.carouselWrapper}>
                        <Carousel showThumbs={false} infiniteLoop autoPlay interval={10000} showStatus={false}>
                        {topNewsItems.map((item) => (
                                <div key={item._id} className={styles.newsCard}>
                                    <div className={styles.detailsGrp}>
                                        <div className={styles.imageBackground} style={{ backgroundImage: `url(${item.image || pholder.src})` }}></div>
                                        <h1 className={styles.headlineLarge}>{item.title}</h1>
                                        <Link key={item._id} href={`/news/${item._id}`} passHref>
                                        <button className={styles.button1}>
                                            Read More
                                            <span className={styles.iconWrapper}>
                                                <FaArrowCircleRight className={styles.icon} />
                                            </span>
                                        </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
                <div className={styles.lowerPanel}>
                    <div className={styles.headerGrp}>
                        <h1 className={styles.title}>More News</h1>
                        <Link href="/news" passHref>
                        <button className={styles.seeAll} onClick={() => setShowAll(!showAll)}>
                            {showAll ? 'Show Less' : 'See All'}
                        </button>
                        </Link>
                    </div>
                    <div className={styles.cardContainer}>
                        {loading ? (
                            <div className={styles.spinnerWrapper}>
                                <ClipLoader size={50} color="#3498db" loading={loading} />
                            </div>
                        ) : (
                            displayedItems.map((item) => (
                                <Link key={item._id} href={`/news/${item._id}`} passHref>
                                    <div className={styles.cardWrapper}>
                                        <Card image={item.image || pholder.src} title={item.title} date={item.date} />
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
