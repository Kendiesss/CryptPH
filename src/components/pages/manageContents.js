// @/components/HeroPage.js

import Head from 'next/head';
import Layout from '../Layout/adminIndex';
import styles from '@/styles/styles'
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import gradientModal from '@/img/gradient-modal.png'
import logo from '@/img/logo.png'
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

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

const EditModal = ({ show, onClose, newsItem, onSave }) => {
    const [imageFile, setImageFile] = useState(newsItem?.image || null);
    const [title, setTitle] = useState(newsItem?.title || '');
    const [category, setCategory] = useState(newsItem?.category || '');
    const [author, setAuthor] = useState(newsItem?.author || '');
    const [date, setDate] = useState(newsItem?.date ? newsItem.date.split('T')[0] : '');
    const [description, setDescription] = useState(newsItem?.description || '');

    useEffect(() => {
        if (newsItem) {
            setImageFile(newsItem.image || null);
            setTitle(newsItem.title || '');
            setCategory(newsItem.category || '');
            setAuthor(newsItem.author || ''); // Check this value
            setDate(newsItem.date ? newsItem.date.split('T')[0] : '');
            setDescription(newsItem.description || '');
            console.log("Authors in modal:", newsItem.author); // Debug line
        }
    }, [newsItem]);
    
    const convertToBase64 = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => setImageFile(reader.result);
        reader.onerror = (error) => console.log("Error: ", error);
    };

    if (!show) return null;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title || !category || !imageFile || !author || !description) {
            alert('Please fill in all required fields.');
            return;
        }
    
        const updatedData = {
            title,
            category,
            author,
            date: new Date(date).toISOString(),
            description,
            image: imageFile,
        };
    
        try {
            const response = await fetch(`/api/news/edit?id=${newsItem._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
    
            if (response.ok) {
                const data = await response.json();
                onSave(data); // Pass updated data to parent
                onClose(); // Close modal
            } else {
                console.error('Error updating news item:', response.statusText);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    


    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modal}>
                <div style={styles.formContainer}>
                    <img src={logo.src} style={styles.cryptPH} />
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
                            <option value="News">News</option>
                            <option value="Education">Educational Article</option>
                            <option value="FAQ">FAQ</option>
                        </select>
                    </div>
                </div>
                <div style={styles.fileInputContainer}>
                    <h2 style={styles.fileLabel}>Content Image</h2>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={convertToBase64}
                        style={styles.fileInput}
                    />
                    <h2 style={styles.modalHeaderSub}>Authors</h2>
                    <input
                        type="text"
                        placeholder="Content Authors"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
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

                <ReactQuill
                    value={description}
                    onChange={setDescription}
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


const AddModal = ({ show, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    if (!show) {
        return null;
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result; // Keep the entire base64 string
                setImageFile(base64String); // Store as string
            };
            reader.readAsDataURL(file);
        }
    };

    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !category || !imageFile || !author || !description) {
            alert('Please fill in all required fields.');
            return;
        }

        const formattedDate = date ? new Date(date).toISOString() : '';

        const formData = {
            title,
            category,
            author,
            date: formattedDate,
            description,
            image: imageFile, // Send the base64 string
        };

        try {
            const response = await fetch('/api/news/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("News added successfully:", data);
                onClose();
            } else {
                const errorData = await response.json();
                console.error("Failed to add news:", errorData);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modal}>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formContainer}>
                        <img src={logo.src} style={styles.cryptPH} />
                        <div style={styles.contentTitleContainer}>
                            <h2 style={styles.modalHeaderSub}>Content Title</h2>
                            <input
                                type="text"
                                placeholder="Content Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={styles.titleInput}
                                required
                            />
                            <h2 style={styles.modalHeaderSub}>Category</h2>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={styles.dropdown}
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="News">News</option>
                                <option value="Education">Educational Article</option>
                                <option value="FAQ">FAQ</option>
                            </select>
                        </div>
                    </div>
                    <div style={styles.fileInputContainer}>
                        <h2 style={styles.fileLabel}>Content Image</h2>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={styles.fileInput}
                        />
                        <h2 style={styles.modalHeaderSub}>Authors</h2>
                        <input
                            type="text"
                            placeholder="Content Authors"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            style={styles.textInput}
                            required
                        />
                        <h2 style={styles.modalHeaderSub}>Date Published</h2>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={styles.textInput}
                            required
                        />
                    </div>
                    <ReactQuill
                        value={description}
                        onChange={setDescription}
                        style={styles.quillEditor}
                        theme="snow"
                    />
                    <div style={styles.bottomFormContainer}>
                        <h2 style={styles.modalHeaderMain}>New Content</h2>
                        <div style={styles.modalActions}>
                            <button type="submit" style={styles.ModalSave}>Save</button>
                            <button onClick={onClose} type="button" style={styles.ModalCancel}>Cancel</button>
                        </div>
                    </div>
                </form>
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

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null); // If needed for editing

    // Other states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newsData, setNewsData] = useState([]);
    const [newsItem, setNewsItem] = useState(null);
    const [selectedNewsItem, setSelectedNewsItem] = useState(null);

    

    const [hoveredButton, setHoveredButton] = useState(null);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isSearchHovered, setIsSearchHovered] = useState(false);

    //fetch news from db

    //fetch 
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news/fetch');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched news data:', data); // Confirm data structure
                setNewsData(data); // Assuming you have useState for newsData
            } catch (error) {
                console.error('Error fetching news:', error);

            }
        };
    
        fetchNews();

        const intervalId = setInterval(() => {
            fetchNews();
        }, 1500); //

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
    
    //modals

    const handleEditClick = (item) => {
        setNewsItem(item); // Set the selected news item
        console.log("Editing news item:", item); // Log the news item being edited
        setIsModalOpen(true); // Open the edit modal
    };


    const handleDeleteClick = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                const response = await fetch(`/api/news/delete?id=${id}`, {
                    method: 'DELETE',
                });
    
                if (response.ok) {
                    // Update local state to remove deleted item
                    setNewsData((prevData) => prevData.filter((item) => item._id !== id));
                } else {
                    console.error('Failed to delete news item');
                }
            } catch (error) {
                console.error('Error deleting news item:', error);
            }
        }
    };
    
    

    const handleUpdate = async () => {
        // Prepare data to send to API
        const formattedDate = date ? new Date(date).toISOString() : '';
        console.log("Updating with:", updatedData);

    
        const updatedData = {
            title,
            category,
            author,
            date: formattedDate,
            description,
            image: imageFile // Assuming base64 string is stored
        };
    
        try {
            const response = await fetch(`/api/news/edit/${newsItem._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
    
            if (response.ok) {
                const updatedItem = await response.json();
                // Update local state
                setNewsData((prevData) =>
                    prevData.map((item) =>
                        item._id === updatedItem._id ? updatedItem : item
                    )
                );
                setIsModalOpen(false); // Close the modal
            } else {
                console.error('Failed to update news item');
            }
        } catch (error) {
            console.error('Error updating news item:', error);
        }
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
        console.log("    saved:", formData);
        
        // Handle form submission here
    };

    useEffect(() => {
        if (newsItem) {
            setTitle(newsItem.title);
            setCategory(newsItem.category);
            setAuthor(newsItem.author);
            setDate(newsItem.date);
            setDescription(newsItem.description);
            setImageFile(newsItem.image);
        }
    }, [newsItem]);
    

    //POST
    const handleAddSave = async (formData) => {
        console.log("Submitting form data:", formData); // Log form data
        console.log({
            title,
            category,
            author,
            date: formattedDate,
            description,
            imageFile,
        });
        try {
            const response = await fetch('/api/news/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("News added successfully:", data);
                console.log(newsItem.image);

                // Close modal or reset form as needed
            } else {
                const errorData = await response.json(); // Get error details
                console.error("Failed to add news:", errorData);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
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

    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };
    
    const handleRegister = () => {
        console.log('Register button clicked');
        window.location.href = '/learn';
      };
      const [isHovered, setIsHovered] = useState(false);

      return (
        <Layout pageTitle="Manage Contents - CryptPH Admin">
            <Head></Head>
            <div style={styles.pageContainer}>
                <h1 style={styles.pageHeader}>Contents</h1>
    
                <button onClick={handleAddClick} style={styles.addNewButton}>
                    Add New
                    <IoIosAddCircle style={styles.addNewIcon} />
                </button>
    
                <div style={styles.cardsContainer}>
                    {newsData.length > 0 ? (
                        newsData.map((newsItem) => (
                        <Card key={newsItem._id}>
                                <Link href={newsItem.category === "Education" ? `/educational/${newsItem._id}` : `/news/${newsItem._id}`} legacyBehavior>
                                <a>
                                    <img src={newsItem.image} alt={newsItem.title} style={styles.cardImage} />
                                </a>
                            </Link>   
                            <h1 style={styles.cardName}>{newsItem.title.length > 20 ? `${newsItem.title.substring(0, 20)}...` : newsItem.title}</h1>
                            
                            <p style={styles.cardInfo}>
                                {stripHtmlTags(newsItem.description).substring(0, 50)}...
                            </p>
    
                            <div style={styles.categoryGroup}>
                                <p style={styles.cardHeader}>Category</p>
                                <p style={styles.cardInfo}>{newsItem.category}</p>
                            </div>
                            <div style={styles.categoryGroup}>
                                <p style={styles.cardHeader}>Date Created</p>
                                <p style={styles.cardInfo}>{new Date(newsItem.date).toLocaleDateString()}</p>
                            </div>
                            <div style={styles.categoryGroup}>
                                <p style={styles.cardHeader}>Authors</p>
                                <p style={styles.cardInfo}>{newsItem.author}</p>
                            </div>
                            <div style={styles.iconGroup}>
                                <button onClick={() => handleEditClick(newsItem)}><FaRegEdit style={styles.cardIcon} /></button>
                                <button><FaRegTrashAlt style={styles.cardIcon} onClick={() => handleDeleteClick(newsItem._id)} /></button>
                            </div>
                        </Card>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px' }}>
                            No Content Being Displayed.
                        </p>
                    )}
                </div>
    
                <EditModal 
                    show={isModalOpen}
                    onClose={handleCloseModal}
                    newsItem={newsItem} // Pass the currently selected news item here
                    onSave={handleSave}
                />
                <AddModal show={isAddModalOpen} onClose={handleAddCloseModal} />
    
            </div>
        </Layout>
    );    
}