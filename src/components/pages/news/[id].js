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
            <div style={styles.pageContainer}>
                <div style={styles.newsPanel}>
                    <div style={styles.upperPanel}>
                        <div style={styles.newsCard}>
                            <div style={styles.detailsGrp}>
                                <div style={{ ...styles.imageBackground, backgroundImage: `url(${newsItem.image || pholder.src})` }}></div>
                                <h1 style={styles.headlineLarge}>{newsItem.title}</h1>
                                <div style={styles.button1}>
                                    {new Date(newsItem.date).toLocaleDateString()}
                                    <span style={styles.iconWrapper}>
                                        <FaCalendarDay style={styles.icon} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.midPanel}>
                        <div style={styles.midUpperGrp}>
                            <h1 style={styles.authors}>By: {newsItem.author || 'Unknown Author'}</h1>
                        </div>

                        <div 
                            style={styles.newsBody} 
                            dangerouslySetInnerHTML={{ __html: newsItem.description || 'Lorem ipsum...' }} 
                        />
                    </div>

                    <div style={styles.lowerPanel}>
                        <div style={styles.button2}>
                            Share
                            <span style={styles.iconWrapper}>
                                <FaShare style={styles.icon} />
                            </span>
                        </div>
                    </div>
                </div>

                                <div style={styles.rightPanel}>
                    <div style={styles.innerCard}>
                        <h1 style={styles.title}>Learn More</h1>
                        {newsItems
                            .filter(news => news.category === "News") // Filter by category
                            .map(news => (
                                <div 
                                    style={{
                                        ...styles.newsCardSmall, 
                                        backgroundImage: `url(${news.image || pholder.src})`
                                    }} 
                                    key={news._id}
                                >
                                    <Link href={`/news/${news._id}`} passHref>
                                        <div style={styles.overlay}></div>
                                    </Link>
                                    <div style={styles.content}>
                                        <h1 style={styles.title2}>{news.title}</h1>
                                    </div>
                                </div>
                            ))
                        }
                        <div style={styles.viewAllButton}>
                            View All
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};


const styles = {
    pageContainer:{
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '6rem',
        marginTop: '1rem',
    },

    newsPanel:{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        width: '1000px',
        height: '1400px',
        zIndex: '-1',
        borderRadius: '30px',
    },

    upperPanel:{
        display: 'flex',
        flexDirection: 'row',
        width: '1200px',

    },

    newsCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'right',
        position: 'relative',
        height: '500px', // Set the height of the newsCard
        width: '1000px',  // Set the width of the newsCard
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',
        
    },

        imageBackground: {
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                backgroundSize: 'cover', // Makes sure the image covers the entire area
                backgroundPosition: 'center', // Centers the image
                backgroundRepeat: 'no-repeat',
                zIndex: -1, // Puts the image behind the text
        },
        

        detailsGrp:{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            height: '150px',
            width: '1000px',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
            padding: '50px',
        },

            headlineLarge:{
                fontFamily: 'Sora',
                fontWeight: '900',
                fontSize: '50px',
            },

            button1: {
                fontFamily: 'Sora',
                fontWeight: '700',
                fontSize: '12px',
                borderRadius: '50px',
                backgroundColor: 'white',
                padding: '10px 20px', // Added horizontal padding for better appearance
                color: '#0B162B',
                height: '30px',
                width: 'auto', // Adjust to the button's content
                display: 'inline-flex', // Inline flex to align text and icon
                alignItems: 'center', // Vertically center items
                justifyContent: 'center',
            },
        
            iconWrapper: {
                display: 'inline-flex',
                alignItems: 'center',
                marginLeft: '10px',
            },
        
            icon: {
                fontSize: '20px', 
                verticalAlign: 'middle', // Ensure vertical alignment
            },

    midPanel:{
        width: '1000px',
        marginTop: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        textAlign: 'left',
        padding: '25px',
    },

        authors:{
            fontFamily: 'Sora',
            fontWeight: '700',
            color: 'white',
            fontSize: '12px',
            marginBottom: '10px',
            backgroundColor: '#0B162B',
            borderRadius:'30px',
            padding: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',
        },

        newsBody: {
            fontFamily: 'Sora', 
            fontSize: '18px', 
            fontWeight: '600',
            lineHeight: '1.6', 
            textAlign: 'justify', 
            color: '#0B162B',
            marginBottom: '20px', 
            padding: '10px 20px', 
        },

        lowerPanel: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end', // Aligns the button to the right
            padding: '20px', // Add padding to give some space around the button
        },
        
        button2: {
            fontFamily: 'Sora',
            fontWeight: '700',
            color: '#0B162B',
            fontSize: '12px',
            backgroundColor: 'whitesmoke',
            border: '1px solid #0B162B',
            width: '120px', // Adjusted width for better appearance
            padding: '10px',
            borderRadius: '30px',
            display: 'flex', // To make the content centered
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
        },

        rightPanel: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '375px', // Set width for the right panel
            height: '100%', // Match height to news panel
            marginLeft: '2rem', // Add spacing from the main content
            backgroundColor: '#0B162B', // Light background for contrast
            padding: '20px',
            borderRadius: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
    
        innerCard: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            border: '1px solid white',
            width: '100%', // Fill the width of rightPanel
            padding: '20px',
            borderRadius: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
            marginBottom: '20px', // Space between cards
        },
    
        title: {
            fontFamily: 'Sora',
            fontWeight: '900',
            fontSize: '24px',
            color: 'white',
            marginBottom: '15px', // Space below title
        },
    
        newsCardSmall: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: '150px',
            width: '100%', // Fill the width of innerCard
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginBottom: '10px', // Space between small news cards
            cursor: 'pointer', // Change to pointer on hover
            position: 'relative', // Position relative for the inner content
            backgroundImage: `url(${pholder.src})`, // Set the background image
            backgroundSize: 'cover', // Ensure the image covers the entire card
            backgroundPosition: 'center', // Center the image
            backgroundRepeat: 'no-repeat', // Prevent image repetition
        },
    
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
            borderRadius: '10px', // Match the card's border radius
            zIndex: 1, // Make sure it is above the background image
        },
    
        content: {
            position: 'relative', // Position content above the overlay
            zIndex: 2, // Bring content above the overlay
        },
    
        title2: {
            fontFamily: 'Sora',
            fontWeight: '700',
            fontSize: '18px',
            color: 'white',
        },

        viewAllButton: {
            fontFamily: 'Sora',
            fontWeight: '700',
            fontSize: '14px',
            color: '#0B162B',
            backgroundColor: 'whitesmoke',
            border: '1px solid #0B162B',
            borderRadius: '30px',
            padding: '10px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            marginTop: '10px', 
            width: '100%', 
            transition: 'background-color 0.3s',
        },

};
