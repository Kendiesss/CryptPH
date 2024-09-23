
import Head from 'next/head';
import pholder from '@/img/placeholder-learn2.png';
import { FaShare } from "react-icons/fa";
import React from 'react'
import Layout from '../Layout'
import { FaClock } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";




export default function DummyPage({ title }) {
    return (
        <Layout
            pageTitle={title}
        >
           
            <div style={styles.pageContainer}>

                <div style={styles.newsPanel}>
                    <div style={styles.upperPanel}>
                        <div style={styles.newsCard}>
                            <div style={styles.detailsGrp}>
                                <div style={{ ...styles.imageBackground, backgroundImage: `url(${pholder.src})` }}></div>
                                <h1 style={styles.headlineLarge}>Article Headline</h1>
                                <div style={styles.button1}>
                                    September 23, 2024
                                    <span style={styles.iconWrapper}>
                                        <FaCalendarDay style={styles.icon} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.midPanel}>
                        <div style={styles.midUpperGrp}>
                            <h1 style={styles.authors}>By: CryptPH Admin</h1>
                        </div>

                        <p style={styles.newsBody}>Lorem ipsum odor amet, consectetuer adipiscing elit. Risus tempor nisl vestibulum erat lacinia cubilia massa. Curabitur nisl nec molestie magnis, dapibus finibus diam dolor. Sociosqu curabitur pellentesque duis class efficitur ligula ornare. Quam maximus luctus maecenas ridiculus mus ipsum curabitur. <br /><br /> Himenaeos sociosqu scelerisque adipiscing justo in. Integer dapibus placerat facilisis eleifend nunc litora cubilia.
                        Inceptos adipiscing eget porttitor inceptos pellentesque fusce lectus. Elementum ultrices taciti fames faucibus nam? Lobortis urna suscipit sit; integer sociosqu erat pretium. Duis tristique penatibus class efficitur luctus. Dis massa tincidunt fringilla posuere vivamus. Sollicitudin mus et ut malesuada ultricies tempus. <br/> <br /> Massa at litora tristique facilisis; ipsum suspendisse eu penatibus.
                        Pulvinar dolor orci pellentesque at metus ad imperdiet. Quam fringilla leo auctor neque justo. Nam mi montes senectus massa eros dictumst. Ex nec laoreet luctus diam est. Himenaeos fames tempor nec gravida; pulvinar nullam. Sem ullamcorper ac vestibulum donec sociosqu tempor! Mattis vivamus duis natoque; magna aenean habitasse eu. Quisque neque eros inceptos gravida ultricies.
                        <br></br><br></br>
                        Conubia habitasse mauris sodales eleifend, tellus suscipit hac placerat. Risus vehicula lobortis ultricies facilisi orci pulvinar? Egestas habitasse vulputate euismod nostra habitasse nisl aliquet ornare. Etiam euismod mattis porttitor taciti dolor. Massa proin ipsum placerat vel enim. Sed sapien iaculis dolor; libero netus dictum? Ultrices luctus accumsan curae orci purus ornare inceptos laoreet. Elementum platea non elit magnis efficitur praesent laoreet ridiculus.
                        </p>
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
                        <h1 style={styles.title}>More Articles</h1>

                        <div style={styles.newsCardSmall}>
                            <div style={styles.overlay}></div> {/* Overlay with semi-transparency */}
                            <div style={styles.content}>
                                <h1 style={styles.title2}>Article Headline...</h1>
                                {/* Other content can go here */}
                            </div>
                        </div>

                        <div style={styles.newsCardSmall}>
                            <div style={styles.overlay}></div> {/* Overlay with semi-transparency */}
                            <div style={styles.content}>
                                <h1 style={styles.title2}>Article Headline...</h1>
                                {/* Other content can go here */}
                            </div>
                        </div>

                        <div style={styles.newsCardSmall}>
                            <div style={styles.overlay}></div> {/* Overlay with semi-transparency */}
                            <div style={styles.content}>
                                <h1 style={styles.title2}>Article Headline...</h1>
                                {/* Other content can go here */}
                            </div>
                        </div>

                        <div style={styles.newsCardSmall}>
                            <div style={styles.overlay}></div> {/* Overlay with semi-transparency */}
                            <div style={styles.content}>
                                <h1 style={styles.title2}>Article Headline...</h1>
                                {/* Other content can go here */}
                            </div>
                        </div>

                        <div style={styles.viewAllButton}>
                            View All
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
            marginTop: '10px', // Space above the button
            width: '100%', // Full width of the innerCard
            transition: 'background-color 0.3s',
        },
}
