const styles = {

    // A. Containers 

    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        marginLeft: '10rem', 
        marginRight: '10rem',
        minHeight: '100vh',
        alignItems: 'left',
        justifyContent:'left',
        position:'relative',
    },

    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height:'50px',
        width:'1255px',
        borderRadius: '20px',
        marginBottom: '30px',
        marginTop: '50px',
    },

    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '1px',
        height: 'auto',
        width: 'auto',
        border: '2px solid white',
        padding: '10px',
        borderRadius: '30px',
    },

    // B. Headers, groups and other components

    // B-1 Headers

    pageHeader: {
        fontFamily: 'Sora',
        color: 'white',
        justifyContent: 'center',
        fontSize: '50px',
        fontWeight: '800',
        margin: '10px',
    },
    
    // B-2 Groups

    buttonGroup: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'left',
        marginBottom: '20px',
        padding: '10px',
        marginRight: '10rem',
    },

    buttonIconGroup:{
        display: 'flex',
        flexDirection: 'column',
        marginLeft :'5px',
    },

    categoryGroup:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconGroup: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:'10px',
    },

    // B-3 Cards

    cardsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '20px', 
        width: '100%', 
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0B162B',
        height: '600px',
        width: '300px',
        borderRadius: '20px',
        marginTop: '20px',
        border: '2px solid white',
        padding: '10px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '8px',
    },
    cardDescription: {
        fontFamily: 'Sora',
        fontSize: '14px',
        color: 'white',
        margin: '10px 0',
    },
    
    cardName:{
        fontFamily: 'Sora',
        fontSize: '22px',
        fontWeight: '700',
    },
    
    cardHeader:{
        justifyContent: 'center',
        fontFamily: 'Sora',
        fontWeight: '500',
        fontSize: '15px',
        color: '#4A4A5A',
    },
    cardInfo:{
        justifyContent: 'center',
        fontFamily: 'Sora',
        fontWeight: '200',
        fontSize: '18px',
        color: 'white',
    },
    cardHover: {
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)', 
        transform: 'scale(1.05)', 
    },
   
    cardIcon: {
        fontSize: '85px',
        color: 'white',
        padding: '20px',
    },

    // C. Buttons

    // C.1 Search 

    searchIcon:{
        fontSize:'20px',
        color:'#0B162B',        
    },

    searchButton: {
        backgroundColor: 'white',
        height: '35px',
        width: '35px',
        borderRadius: '50%',
        border: '1px solid #0B162B',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '10px', 
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease', 
    },

    searchButtonActive: {
        boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.8)', 
    },

    searchButtonHover: {
        transform: 'scale(1.2)', 
    },

    searchInput: {
        width: '250px',
        height: '35px',
        borderRadius: '20px',
        border: '1px solid #0B162B',
        paddingLeft: '15px',
        fontFamily: 'Sora',
        fontWeight: '500',
        fontSize: '15px',
        color: '#0B162B',
    },
    
    // C.2 Sort Buttons

    sortTitle: {
        fontFamily: 'Sora',
        fontSize:'15px',
        alignItems:'center',
        justifyContent:'center',
        padding: '5px',
        marginLeft: '100px',
        display: 'flex',
    },
    sortButton: {
        width: '175px',
        height: '50px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0B162B',
        color: 'white',
        border: '2px solid white',
        borderRadius: '20px',
        padding: '10px 20px',
        margin: '10px',
        fontFamily: 'Sora',
        fontWeight: '500',
        fontSize: '15px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
    },
    sortButtonHover: {
        boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.8)', 
        transform: 'scale(1.05)', 
    },
    buttonIconUp:{
        fontSize: '12px',
    },
    buttonIconDown:{
        fontSize: '12px',
    },

    // C.3 Add New Button

    addNewButton: {
        width: '150px',
        height: '50px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        color: '#0B162B',
        border: '2px solid white',
        borderRadius: '20px',
        padding: '20px 20px',
        margin: '10px',
        fontFamily: 'Sora',
        fontWeight: '500',
        fontSize: '15px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
    },

    addNewButtonHover: {
        boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.8)', 
        transform: 'scale(1.05)',
    },

    addNewButtonActive: {
        boxShadow: '0 0 20px 7px rgba(255, 255, 255, 0.8)', 
        transform: 'scale(1.1)',
    },

    addNewIcon:{
        fontSize:'30px',
        color: '#0B162B',
    },

         //
         
        modalOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        modal: {
            backgroundColor: '#0B162B',
            // backgroundImage: `url(${gradientModal.src})`, // Set your image path here
            backgroundSize: 'cover', // Ensures the image covers the entire modal
            backgroundPosition: 'center', // Centers the image
            backgroundRepeat: 'no-repeat', // Prevents the image from repeating
            borderRadius: '40px', 
            border: '1px solid white',
            padding: '20px',
            width: '100%', 
            maxWidth: '1200px', 
            height: '700px', // Set height to auto
            maxHeight: '1200px', // Limit the height of the modal
            display: 'flex',
            flexDirection: 'column',
            margin: '20px',
            overflowY: 'auto', // Ensure that if the content overflows, it scrolls
        },    
        modalHeaderMain:{
            fontFamily: 'Sora',
            fontSize: '35px',
            color: 'white',
            fontWeight: '900',
            justifyContent: 'center',
            marginTop: '50px',
            textAlign: 'center',
        },

        modalHeaderSub:{
            fontFamily: 'Sora',
            fontSize: '18px',
            color: 'white',
            fontWeight: '700',
            margin: '10px 0',
        },

        textInput: {
            fontFamily: 'Sora',
            color: '#0B162B',
            margin: '10px 0',
            padding: '10px',
            fontSize: '12px',
            borderRadius: '20px',
        },

        titleInput: {
            fontFamily: 'Sora',
            color: '#0B162B',
            margin: '10px 0',
            padding: '10px',
            fontSize: '12px',
            borderRadius: '20px',
            width:'500px',
        },
        textarea: {
            margin: '10px 0',
            padding: '10px',
            fontSize: '16px',
            height: '100px',
        },
        bottomFormContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '0px',
        },
        modalActions: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '50px',
        },
        quillContainer: {
            width: '1000px', // Adjust to your preferred width
            height: '1000px', // Adjust to your preferred height
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative',
        },
        quillEditor: {
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
            color: 'black',
        },
        ModalSave: {
            fontFamily: 'Sora',
            fontWeight: '800',
            backgroundColor: 'white', // Green color
            color: '#0B162B',
            border: 'none',
            borderRadius: '50px',
            padding: '10px 20px',
            marginRight: '10px',
            cursor: 'pointer',
            width: '100px'
        },
        ModalCancel: {
            fontFamily: 'Sora',
            fontWeight: '800',
            backgroundColor: '#0B162B', 
            color: 'white',
            border: '2px solid white',
            borderRadius: '50px',
            padding: '10px 20px',
            cursor: 'pointer',
            width: '100px',
        },
        fileInputContainer: {
            display: 'flex',
            flexDirection: 'row',
            margin: '1px 0',
            alignItems: 'center', 
            justifyContent: 'flex-start',
            width: '100%', // Make sure it aligns with the other containers
            padding: '20px', // Add some padding if needed
            gap: '15px',
        },
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
           justifyContent: 'flex-start', // Align items to the start
            margin: '1px 0',
            padding: '20px',
            gap:'15px',
        }, 
        contentTitleContainer: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '1px',
            width: '100%',
            gap: '15px',
        },
        dropdown: {
            width: '350px',
            height: 'auto',
            padding: '8px',
            marginBottom: '12px', /* Ensure spacing between dropdown and next element */
            border: '1px solid #ccc',
            borderRadius: '20px',
            color: '#0B162B',
        },        
        fileLabel: {
            fontFamily: 'Sora',
            color: 'white',
            marginRight: '10px',
            fontWeight:'700',
            fontSize: '18px',
        },
        fileInput: {
            border: '1px solid white',
            padding: '10px',
            borderRadius: '20px'
        },
        cryptPH:{
            width:'200px',
            height:'50px',
            margin:'0',
        }
    
};

export default styles;
