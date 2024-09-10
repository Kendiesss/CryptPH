// @/components/HeroPage.js

import Head from 'next/head';
import Layout from '../Layout/adminIndex';
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import gradientModal from '@/img/gradient-modal.png'
import logo from '@/img/logo.png'
import React, {useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles



const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});


const toggleSort = (key) => {
    setSortState((prevState) => ({
        ...prevState,
        [key]: prevState[key] === 'asc' ? 'desc' : 'asc',
    }));
};


const Card = ({ children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{
                ...styles.card,
                ...(isHovered ? styles.cardHover : {})
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </div>
    );
};

const EditModal = ({ show, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [authors, setAuthors] = useState('');
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');

    if (!show) {
        return null;
    }

    const handleSubmit = () => {
        const formData = { title, category,image, authors, date, content };
        onSave(formData);
        onClose();
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modal}>
               
                <div style={styles.formContainer}>
                    <img src={logo.src} style={styles.cryptPH}/>
                    <div style={styles.contentTitleContainer}>
                    <h2 style={styles.modalHeaderSub}>News Title</h2>
                        <input
                            type="text"
                            placeholder="Content Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={styles.titleInput}
                        />
                    <h2 style={styles.modalHeaderSub}>Category</h2>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={styles.dropdown}
                        >
                            <option value="news">News</option>
                        </select>
                    </div>
                </div>
                <div style={styles.fileInputContainer}>
                    <h2 style={styles.fileLabel}>Content Image</h2>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        style={styles.fileInput}
                    />
                    <h2 style={styles.modalHeaderSub}>Authors</h2>
                    <input
                        type="text"
                        placeholder="Content Authors"
                        value={authors}
                        onChange={(e) => setAuthors(e.target.value)}
                        style={styles.textInput}
                    />
                    <h2 style={styles.modalHeaderSub}>Date Published</h2>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={styles.textInput}
                    />
                </div>
                
                {/* <h2 style={styles.modalHeaderSub}>Content</h2> */}
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    style={styles.quillEditor}
                    theme="snow"
                />
                <div style={styles.bottomFormContainer}>
                    <h2 style={styles.modalHeaderMain}>Edit News</h2>
                    <div style={styles.modalActions}>
                        <button onClick={handleSubmit} style={styles.ModalSave}>Save</button>
                        <button onClick={onClose} style={styles.ModalCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const AddNewModal = ({ show, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [authors, setAuthors] = useState('');
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');

    if (!show) {
        return null;
    }

    const handleSubmit = () => {
        const formData = { title, category,image, authors, date, content };
        onSave(formData);
        onClose();
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modal}>
               
                <div style={styles.formContainer}>
                    <img src={logo.src} style={styles.cryptPH}/>
                    <div style={styles.contentTitleContainer}>
                    <h2 style={styles.modalHeaderSub}>Content Title</h2>
                        <input
                            type="text"
                            placeholder="Content Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={styles.titleInput}
                        />
                    <h2 style={styles.modalHeaderSub}>Category</h2>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={styles.dropdown}
                        >
                            <option value="">Select a category</option>
                            <option value="news">News</option>
                            <option value="educ">Educational Article</option>
                            <option value="faq">FAQ</option>
                        </select>
                    </div>
                </div>
                <div style={styles.fileInputContainer}>
                    <h2 style={styles.fileLabel}>Content Image</h2>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        style={styles.fileInput}
                    />
                    <h2 style={styles.modalHeaderSub}>Authors</h2>
                    <input
                        type="text"
                        placeholder="Content Authors"
                        value={authors}
                        onChange={(e) => setAuthors(e.target.value)}
                        style={styles.textInput}
                    />
                    <h2 style={styles.modalHeaderSub}>Date Published</h2>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={styles.textInput}
                    />
                </div>
                
                {/* <h2 style={styles.modalHeaderSub}>Content</h2> */}
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    style={styles.quillEditor}
                    theme="snow"
                />
                <div style={styles.bottomFormContainer}>
                    <h2 style={styles.modalHeaderMain}>New Content</h2>
                    <div style={styles.modalActions}>
                        <button onClick={handleSubmit} style={styles.ModalSave}>Save</button>
                        <button onClick={onClose} style={styles.ModalCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};





export default function HeroPage() {

    const [sortState, setSortState] = useState({
        name: '',
        category: '',
        dateCreated: '',
    });

    

    const [hoveredButton, setHoveredButton] = useState(null);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isSearchHovered, setIsSearchHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);


    //modals

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

    const handleAddCloseModal = () => {
        setIsAddModalOpen(false);
    };

    

    const handleSave = (formData) => {
        console.log("Form data saved:", formData);
        // Handle form submission here
    };

    const handleAddSave = (formData) => {
        console.log("Form data saved:", formData);
        // Handle form submission here
    };


    const toggleSort = (key) => {
        setSortState((prevState) => ({
            ...prevState,
            [key]: prevState[key] === 'asc' ? 'desc' : 'asc',
        }));
    };

    const handleSearchClick = () => {
        setIsSearchActive(!isSearchActive);
        setIsSearchHovered(!isSearchHovered);
    };


    const handleRegister = () => {
        console.log('Register button clicked');
        window.location.href = '/learn';
      };
      const [isHovered, setIsHovered] = useState(false);

    return (
        <Layout pageTitle="Admin News - CryptPH">
            <Head>
            </Head>

            
            <div style={styles.pageContainer}>
                
                <div style={styles.infoContainer}>
                    <h1 style={styles.pageHeader}>Contents</h1>
                    <div style={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search..."
                            style={styles.searchInput}
                        />
                        <button
                            style={{
                                ...styles.searchButton,
                                ...(isSearchActive ? styles.searchButtonActive : {}),
                                ...(isSearchHovered ? styles.searchButtonHover : {}),
                            }}
                            onClick={handleSearchClick}
                        >
                            <FaSearch style={styles.searchIcon} />
                        </button>
                    </div> 
                </div>

             
                <div style={styles.buttonGroup}>
                <button
                     onClick={handleAddClick}
                    style={{
                        ...styles.addNewButton,
                        ...(isHovered ? styles.addNewButtonHover : {}),
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Add New
                    <IoIosAddCircle style={styles.addNewIcon} />
                </button>

                <h1 style={styles.sortTitle}>Sort By: </h1>

                {[
                        { key: 'name', label: 'Name' },
                        { key: 'category', label: 'Category' },
                        { key: 'dateCreated', label: 'Date Created' },
                ].map(({ key, label }) => (
                        <button
                            key={key}
                            style={{
                                ...styles.sortButton,
                                ...(hoveredButton === key ? styles.sortButtonHover : {}),
                            }}
                            onMouseEnter={() => setHoveredButton(key)}
                            onMouseLeave={() => setHoveredButton(null)}
                            onClick={() => toggleSort(key)}
                        >
                        
                        {label}

                            <div style={styles.buttonIconGroup}>
                                <FaSortUp
                                    style={{
                                        ...styles.buttonIconUp,
                                        display: sortState[key] === 'asc' ? 'block' : 'none',
                                    }}
                                />
                                <FaSortDown
                                    style={{
                                        ...styles.buttonIconDown,
                                        display: sortState[key] === 'desc' ? 'block' : 'none',
                                    }}
                                />
                            </div>
                        </button>
                    ))}
                </div>
                <div style={styles.cardsContainer}>

                <Card>
                            <h1 style={styles.cardName}>Name</h1>
                            
                            <div style={styles.categoryGroup}>
                                <p style={styles.cardHeader}>Category</p>
                                <p style={styles.cardInfo}>News</p>
                            </div>

                            <div style={styles.categoryGroup}>
                                <p style={styles.cardHeader}>Date Created</p>
                                <p style={styles.cardInfo}>0/0/2024</p>
                            </div>

                            <div style={styles.iconGroup}>
                                <button><FaRegEdit style={styles.cardIcon} /></button>
                                <button><FaRegTrashAlt style={styles.cardIcon} /></button>
                            </div>

                </Card>
                <Card>
                            <h1 style={styles.cardName}>Name</h1>
                            
                            <div style={styles.categoryGroup}>
                                <p style={styles.cardHeader}>Category</p>
                                <p style={styles.cardInfo}>News</p>
                            </div>

                            <div style={styles.categoryGroup}>
                                <p style={styles.cardHeader}>Date Created</p>
                                <p style={styles.cardInfo}>0/0/2024</p>
                            </div>

                            <div style={styles.iconGroup}>
                                <button onClick={handleEditClick}><FaRegEdit style={styles.cardIcon} /></button>
                                <button><FaRegTrashAlt style={styles.cardIcon} /></button>
                            </div>

                </Card>
                <Card>
                            <h1 style={styles.cardName}>Name</h1>
                            
                            <div style={styles.categoryGroup}>
                                <p style={styles.cardHeader}>Category</p>
                                <p style={styles.cardInfo}>News</p>
                            </div>

                            <div style={styles.categoryGroup}>
                                <p style={styles.cardHeader}>Date Created</p>
                                <p style={styles.cardInfo}>0/0/2024</p>
                            </div>

                            <div style={styles.iconGroup}>
                                <button><FaRegEdit style={styles.cardIcon} /></button>
                                <button><FaRegTrashAlt style={styles.cardIcon} /></button>
                            </div>

                </Card>

                </div>

                <EditModal show={isModalOpen} onClose={handleCloseModal} onSave={handleSave} />
                <AddNewModal show={isAddModalOpen} onClose={handleAddCloseModal} onSave={handleAddSave} />
            </div>
        </Layout>
    );
}

const styles = {

    //A. Containers 

    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        marginLeft: '10rem', 
        marginRight: '10rem',
        alignItems: 'left',
        justifyContent:'left',
        position:'absolute',
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

    //B. Headers, groups and other components

        //B-1 Headers

        pageHeader: {
            fontFamily: 'Sora',
            color: 'white',
            justifyContent: 'center',
            fontSize: '50px',
            fontWeight: '800',
            margin: '10px',
        },
    
        //B-2 Groups

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
            display: 'column',
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
            display: 'flex',
            display: 'row',
        },
        card: {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#0B162B',
            height: '100px', 
            width: '1255px',  
            borderRadius: '20px', 
            marginTop: '20px',
            marginBottom: '20px',
            border: '2px solid white', 
            justifyContent: 'space-between',
            padding: '30px',
            alignItems: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
     
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
            fontWeight: '700',
            fontSize: '22px',
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
    

    //C. Buttons

        //C.1 Search 

        searchIcon:{
            fontSize:'20px',
            color:'#0B162B',        
        },

        searchButton: {
            backgroundColor: 'white',
            height: '35px',
            width: '35px',
            borderRadius: '50%',
            border: '1px white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #0B162B',
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
        
        //C.2 Sort Buttons

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

        buttonIconUp:{
            fontSize: '12px',
        },
        buttonIconDown:{
            fontSize: '12px',
        },

        //C.3 Add New Button

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


        //Modals

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
