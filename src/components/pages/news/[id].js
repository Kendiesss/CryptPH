import Head from 'next/head';
import pholder from '@/img/placeholder-learn.png';
import { FaShare } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { FaCalendarDay } from "react-icons/fa";
import { useRouter } from 'next/router'; 
import Link from 'next/link';
import styles from '@/styles/newsID.module.css'; // Import your CSS module

function stripHtmlTags(str) {
    if (!str) return '';
    return str.replace(/<\/?[^>]+(>|$)/g, "");
}

function Loader() {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
        </div>
    );
}

export default function NewsDetailPage() {
    const router = useRouter();
    const { id } = router.query; 
    const [newsItem, setNewsItem] = useState(null); 
    const [newsItems, setNewsItems] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchNewsItem = async () => {
            if (id) {
                setLoading(true);
                try {
                    const response = await fetch(`/api/contents/${id}`);
                    console.log("API Response Status:", response.status); // Log the response status
                    if (!response.ok) {
                        throw new Error(`Failed to fetch news item: ${response.statusText}`);
                    }
                    const data = await response.json();
                    console.log("Fetched Data:", data); // Log the fetched data
                    setNewsItem(data);
                } catch (error) {
                    console.error("Error fetching news item:", error.message); // Log detailed error
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
                const response = await fetch('/api/contents/fetch?category=News');
                const data = await response.json();
                
                const filteredNewsItems = data.filter(news => news._id !== id); // Use _id for comparison
                setNewsItems(filteredNewsItems); 
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
    
        fetchNews();
    }, [id]); // Include id in the dependency array

    const handleShareClick = () => {
        // Copy the current URL to the clipboard
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                // Show the success message
                setShowPopup(true);
                
                // Hide the popup after 3 seconds
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };

    if (loading) {
        return <Loader />;
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
                        <button className={styles.button2} onClick={handleShareClick}>
                            Copy Link
                            <span className={styles.iconWrapper}>
                                <FaShare className={styles.icon} />
                            </span>
                        </button>
                        
                        {showPopup && (
                            <div className={styles.popup}>
                                Copied Link Successfully!
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.rightPanel}>
                    <div className={styles.innerCard}>
                        <h1 className={styles.title}>Learn More</h1>
                        {newsItems
                           .filter(news => news.category === "News") // Filter by category
                           .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date, latest first
                           .slice(0, 5) // Get only the top 5 latest items
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
                            <Link href="/news">
                                View All
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
