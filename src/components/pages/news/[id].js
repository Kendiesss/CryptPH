import Head from 'next/head';
import pholder from '@/img/placeholder-learn.png';
import { FaShare } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { FaCalendarDay } from "react-icons/fa";
import { useRouter } from 'next/router'; 
import Link from 'next/link';
import Footer from '@/pages/Footer';
import Header from '@/pages/Header2';
import styles from '@/styles/newsID.module.css'; // Import your CSS module

function stripHtmlTags(str) {
    if (!str) return '';
    return str.replace(/<\/?[^>]+(>|$)/g, "");
}

export default function NewsDetailPage() {
    const router = useRouter();
    const { id } = router.query; 
    const [newsItem, setNewsItem] = useState(null); 
    const [newsItems, setNewsItems] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchNewsItem = async () => {
            if (id) {
                try {
                    const response = await fetch(`/api/news/${id}`); 
                    if (!response.ok) throw new Error('Failed to fetch news item');
                    const data = await response.json();
                    setNewsItem(data); 
                } catch (error) {
                    console.error("Error fetching news item:", error);
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchNewsItem();
    }, [id]); 

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news/fetch?category=News');
                const data = await response.json();
                
                const filteredNewsItems = data.filter(news => news._id !== id); // Use _id for comparison
                setNewsItems(filteredNewsItems); 
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
    
        fetchNews();
    }, [id]); // Include id in the dependency array

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!newsItem) {
        return <p>No news item found.</p>;
    }

    return (
        <Layout pageTitle={newsItem.title}>
            <div className={styles.pageContainer}>
                <div className={styles.newsPanel}>
                    <div className={styles.upperPanel}>
                        <div className={styles.newsCard}>
                            <div className={styles.detailsGrp}>
                                <div 
                                    className={styles.imageBackground} 
                                    style={{ backgroundImage: `url(${newsItem.image || pholder.src})` }}
                                ></div>
                                <h1 className={styles.headlineLarge}>{newsItem.title}</h1>
                                <div className={styles.button1}>
                                    {new Date(newsItem.date).toLocaleDateString()}
                                    <span className={styles.iconWrapper}>
                                        <FaCalendarDay className={styles.icon} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.midPanel}>
                        <div className={styles.midUpperGrp}>
                            <h1 className={styles.authors}>By: {newsItem.author || 'Unknown Author'}</h1>
                        </div>

                        <div 
                            className={styles.newsBody} 
                            dangerouslySetInnerHTML={{ __html: newsItem.description || 'Lorem ipsum...' }} 
                        />
                    </div>

                    <div className={styles.lowerPanel}>
                        <div className={styles.button2}>
                            Share
                            <span className={styles.iconWrapper}>
                                <FaShare className={styles.icon} />
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.rightPanel}>
                    <div className={styles.innerCard}>
                        <h1 className={styles.title}>Learn More</h1>
                        {newsItems
                            .filter(news => news.category === "News") // Filter by category
                            .map(news => (
                                <div 
                                    className={styles.newsCardSmall} 
                                    key={news._id}
                                    style={{ backgroundImage: `url(${news.image || pholder.src})` }} 
                                >
                                    <Link href={`/news/${news._id}`} passHref>
                                        <div className={styles.overlay}></div>
                                    </Link>
                                    <div className={styles.content}>
                                        <h1 className={styles.title2}>{news.title}</h1>
                                    </div>
                                </div>
                            ))
                        }
                        <div className={styles.viewAllButton}>
                            View All
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
