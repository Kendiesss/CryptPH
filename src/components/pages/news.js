
import Head from 'next/head';
import pholder from '@/img/placeholder-learn.png';
import { FaArrowCircleRight } from "react-icons/fa";
import React from 'react'
import Layout from '../Layout'
import { Carousel } from 'react-responsive-carousel';
import { FaClock } from "react-icons/fa";
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 



export default function DummyPage({ title }) {
    return (
        <Layout
            pageTitle={title}
        >
            {/* <div className="min-h-screen flex flex-col">
                <div className="m-auto">
                    <h1 className="text-4xl">{title}</h1>
                </div>
            </div> */}

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

                            <div style={styles.newsCard}>
                                <div style={styles.detailsGrp}>
                                    <div style={{ ...styles.imageBackground, backgroundImage: `url(${pholder.src})` }}></div>
                                    <h1 style={styles.headlineLarge}>News Headline 2 </h1>
                                    <button style={styles.button1}>
                                        Read More
                                        <span style={styles.iconWrapper}>
                                            <FaArrowCircleRight style={styles.icon} />
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div style={styles.newsCard}>
                                <div style={styles.detailsGrp}>
                                    <div style={{ ...styles.imageBackground, backgroundImage: `url(${pholder.src})` }}></div>
                                    <h1 style={styles.headlineLarge}>News Headline 3 </h1>
                                    <button style={styles.button1}>
                                        Read More
                                        <span style={styles.iconWrapper}>
                                            <FaArrowCircleRight style={styles.icon} />
                                        </span>
                                    </button>
                                </div>
                            </div>

                        </Carousel>
                    </div>
  
                </div>

                <div style={styles.lowerPanel}>
                    <div style={styles.headerGrp}>
                        <h1 style={styles.title}>More News</h1>
                        <button style={styles.seeAll}>See All </button>
                    </div>
                    <div style={styles.cardContainer}>

                        <div style={styles.newsCardSmall}>
                            <img src={pholder.src} style={styles.image2}></img>
                                <div style={styles.headlineGrp}>
                                    <h1 style={styles.headlineSmall}>News Headline</h1>
                                    <h1 style={styles.datePublished}><span style={styles.iconWrapper}><FaClock style={styles.icon2}/></span>9/23/2024</h1>
                                </div>  
                        </div>

                        <div style={styles.newsCardSmall}>
                            <img src={pholder.src} style={styles.image2}></img>
                                <div style={styles.headlineGrp}>
                                    <h1 style={styles.headlineSmall}>News Headline</h1>
                                    <h1 style={styles.datePublished}><span style={styles.iconWrapper}><FaClock style={styles.icon2}/></span>9/23/2024</h1>
                                </div>  
                        </div>

                        <div style={styles.newsCardSmall}>
                            <img src={pholder.src} style={styles.image2}></img>
                                <div style={styles.headlineGrp}>
                                    <h1 style={styles.headlineSmall}>News Headline</h1>
                                    <h1 style={styles.datePublished}><span style={styles.iconWrapper}><FaClock style={styles.icon2}/></span>9/23/2024</h1>
                                </div>  
                        </div>

                        <div style={styles.newsCardSmall}>
                            <img src={pholder.src} style={styles.image2}></img>
                                <div style={styles.headlineGrp}>
                                    <h1 style={styles.headlineSmall}>News Headline</h1>
                                    <h1 style={styles.datePublished}><span style={styles.iconWrapper}><FaClock style={styles.icon2}/></span>9/23/2024</h1>
                                </div>  
                        </div>

                        <div style={styles.newsCardSmall}>
                            <img src={pholder.src} style={styles.image2}></img>
                                <div style={styles.headlineGrp}>
                                    <h1 style={styles.headlineSmall}>News Headline</h1>
                                    <h1 style={styles.datePublished}><span style={styles.iconWrapper}><FaClock style={styles.icon2}/></span>9/23/2024</h1>
                                </div>  
                        </div>

                        <div style={styles.newsCardSmall}>
                            <img src={pholder.src} style={styles.image2}></img>
                                <div style={styles.headlineGrp}>
                                    <h1 style={styles.headlineSmall}>News Headline</h1>
                                    <h1 style={styles.datePublished}><span style={styles.iconWrapper}><FaClock style={styles.icon2}/></span>9/23/2024</h1>
                                </div>  
                        </div>

                    </div>
                        

                </div>

            </div>
        </Layout>
    )
}

const styles={

    pageContainer:{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '6rem',
        marginTop: '1rem',
    },

    upperPanel:{
        display: 'flex',
        flexDirection: 'row',
        width: '1400px',

    },

    carouselWrapper: {
        width: '1400px', // Same width as the news card
        height: '600px', // Same height as the news card
        overflow: 'hidden', // Ensures no extra spacing outside the carousel
        borderRadius: '20px', // Match the border radius to news card
    },

    newsCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'right',
        position: 'relative',
        height: '600px', // Set the height of the newsCard
        width: '1400px',  // Set the width of the newsCard
        borderRadius: '20px',
        overflow: 'hidden',
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
            height: '200px',
            width: '1400px',
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
                fontSize: '20px',
                borderRadius: '50px',
                backgroundColor: 'white',
                padding: '10px 20px', // Added horizontal padding for better appearance
                color: '#0B162B',
                height: '60px',
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
                fontSize: '24px', 
                verticalAlign: 'middle', // Ensure vertical alignment
            },

    lowerPanel:{
        width: '1400px',
        marginTop: '5rem',
        display: 'flex',
        flexDirection: 'column',
    },

        headerGrp:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },

        title:{
            fontFamily: 'Sora',
            fontSize: '30px',
            fontWeight: '900',
        },

        seeAll:{
            fontFamily: 'Sora',
            fontSize: '25px',
            fontWeight: '500',
        },

        cardContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns
            gap: '20px', // Space between cards
            marginTop: '3rem', // Add some margin above
            marginBottom: '3rem',
        },
    
        newsCardSmall: {
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #ccc', // Optional border
            borderRadius: '30px', // Rounded corners
            overflow: 'hidden',
            padding: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    
        image2: {
            width: '100%',
            height: 'auto', // Maintain aspect ratio
            borderRadius: '30px', // Match the rounded corner
            marginBottom: '20px',
        },

        headlineGrp:{
            display:'flex',
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
        
        datePublished:{
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

        icon2:{
            fontSize: '14px', 
            verticalAlign: 'middle',
            marginRight: '10px',
        }

    


}
