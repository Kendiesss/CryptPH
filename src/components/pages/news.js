import Head from 'next/head';
import pholder from '@/img/placeholder-learn.png';
import { FaArrowCircleRight } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import Layout from '../Layout';
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 

// Card component for individual news items
const Card = ({ image, title, date }) => (
    <div style={styles.newsCardSmall}>
        <img src={image} style={styles.image2} alt={title} />
        <div style={styles.headlineGrp}>
            <h1 style={styles.headlineSmall}>{title}</h1>
            <h1 style={styles.datePublished}>
                <span style={styles.iconWrapper}><FaClock style={styles.icon2} /></span>
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
    const [newsItems, setNewsItems] = useState([]); // State to hold news items

    // Fetch news items when the component mounts
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news/fetch?category=News'); // Adjust the endpoint as necessary
                const data = await response.json();
                setNewsItems(data); // Assuming your API returns an array of news items
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, []); // Empty dependency array means this runs once on mount

    return (
        <Layout pageTitle={title}>
            <div style={styles.pageContainer}>
                <div style={styles.upperPanel}>
                    <div style={styles.carouselWrapper}>
                        <Carousel style={styles.carousel} showThumbs={false} infiniteLoop autoPlay interval={3000} showStatus={false}>
                            <div style={styles.newsCard}>
                                <div style={styles.detailsGrp}>
                                    <div style={{ ...styles.imageBackground, backgroundImage: `url(${pholder.src})` }}></div>
                                    <h1 style={styles.headlineLarge}>News Headline</h1>
                                    <button style={styles.button1}>
                                        Read More
                                        <span style={styles.iconWrapper}>
                                            <FaArrowCircleRight style={styles.icon} />
                                        </span>
                                    </button>
                                </div>
                            </div>
                            {/* Additional carousel items can go here */}
                        </Carousel>
                    </div>
                </div>
                <div style={styles.lowerPanel}>
                    <div style={styles.headerGrp}>
                        <h1 style={styles.title}>More News</h1>
                        <Link href="/news" passHref>
                            <button style={styles.seeAll}>See All</button>
                        </Link>
                    </div>
                    <div style={styles.cardContainer}>
                        {/* Map over the fetched news items to create Card components */}
                        {newsItems.map((item) => (
                            <Link key={item._id} href={`/news/${item._id}`} passHref>
                                <div style={styles.cardWrapper}>
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

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '6rem',
        marginTop: '1rem',
    },
    upperPanel: {
        display: 'flex',
        flexDirection: 'row',
        width: '1400px',
    },
    carouselWrapper: {
        width: '1400px',
        height: '600px',
        overflow: 'hidden',
        borderRadius: '20px',
    },
    newsCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'right',
        position: 'relative',
        height: '600px',
        width: '1400px',
        borderRadius: '20px',
        overflow: 'hidden',
    },
    imageBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
    },
    detailsGrp: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '200px',
        width: '1400px',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        padding: '50px',
    },
    headlineLarge: {
        fontFamily: 'Sora',
        fontWeight: '900',
        fontSize: '50px',
    },
    button1: {
        fontFamily: 'Sora',
        fontWeight: '700',
        fontSize: '20px',
        borderRadius: '50px',
        backgroundColor: 'white',
        padding: '10px 20px',
        color: '#0B162B',
        height: '60px',
        width: 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: '10px',
    },
    icon: {
        fontSize: '24px',
        verticalAlign: 'middle',
    },
    lowerPanel: {
        width: '1400px',
        marginTop: '5rem',
        display: 'flex',
        flexDirection: 'column',
    },
    headerGrp: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: 'Sora',
        fontSize: '30px',
        fontWeight: '900',
    },
    seeAll: {
        fontFamily: 'Sora',
        fontSize: '25px',
        fontWeight: '500',
    },
    cardContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginTop: '3rem',
        marginBottom: '3rem',
    },
    newsCardSmall: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        borderRadius: '30px',
        overflow: 'hidden',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    image2: {
        width: '100%',
        height: 'auto',
        borderRadius: '30px',
        marginBottom: '20px',
    },
    headlineGrp: {
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headlineSmall: {
        fontFamily: 'Sora',
        fontWeight: '700',
        fontSize: '22px',
        textAlign: 'center',
    },
    datePublished: {
        fontFamily: 'Sora',
        fontWeight: '500',
        fontSize: '14px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: '30px',
        color: '#0B162B',
        padding: '10px',
    },
    icon2: {
        fontSize: '14px',
        verticalAlign: 'middle',
        marginRight: '10px',
    },
};
