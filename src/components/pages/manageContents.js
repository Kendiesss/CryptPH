// @/components/HeroPage.js

import Head from 'next/head';
import Layout from '../Layout/adminIndex';
// import {styles, mediaQueries} from '@/styles/styles';
import { FaWindowClose } from "react-icons/fa";
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
import styles from '@/styles/manageContents.module.css';
import withAdminAuth from '@/pages/api/auth/withAdminAuth';

import 'react-quill/dist/quill.snow.css'; // Import Quill styles

function Loader() {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
        </div>
    );
}

function AddLoader(){
    return (
        <div className={styles.loaderContainer}>
            <h1 className={styles.loaderHeader}>Submitting your content. Please wait.</h1>
            <div className={styles.loader}></div>
        </div>
    );
}

function EditLoader(){
    return (
        <div className={styles.loaderContainer}>
            <h1 className={styles.loaderHeader}>Saving your changes. Please wait.</h1>
            <div className={styles.loader}></div>
        </div>
    );
}

function DeleteLoader(){
    return (
        <div className={styles.loaderContainer}>
            <h1 className={styles.loaderHeader}>Removing your content. Please wait.</h1>
            <div className={styles.loader}></div>
        </div>
    );
}


const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});

const modules = {
    toolbar: [
        [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        [{ 'align': [] }],
        ['link', 'image'], // Image button added here
        [{ 'indent': '-1'}, { 'indent': '+1' }], // Indentation buttons
        ['blockquote'], // Blockquote button for paragraph emphasis
        ['code-block'], // Code block button for inserting code snippets
      ],
  };


const Card = ({ children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
        className={`${styles.card} ${isHovered ? styles.cardHover : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        {children}
    </div>
    );
};

const EditModal = ({ show, onClose, contentItem, onSave }) => {
    const [title, setTitle] = useState(contentItem?.title || '');
    const [category, setCategory] = useState(contentItem?.category || '');
    const [imageFile, setImageFile] = useState(null);
    const [author, setAuthor] = useState(contentItem?.author || '');
    const [date, setDate] = useState(contentItem?.date ? contentItem.date.split('T')[0] : '');
    const [description, setDescription] = useState(contentItem?.description || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (contentItem) {
            setTitle(contentItem.title || '');
            setCategory(contentItem.category || '');
            setAuthor(contentItem.author || '');
            setDate(contentItem.date ? contentItem.date.split('T')[0] : '');
            setDescription(contentItem.description || '');
        }
    }, [contentItem]);

    if (!show) return null;

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setImageFile(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadToCloudinary = async (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'cryptph_images'); // Your Cloudinary preset
        formData.append('cloud_name', 'dukv38hdq'); // Your Cloudinary cloud name

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dukv38hdq/image/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error('Failed to upload image to Cloudinary');
                return null;
            }
        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            return null;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !category || !author || !description) {
            alert('Please fill in all required fields.');
            return;
        }

        setLoading(true);

        try {
            let imageURL = contentItem.image;

            if (imageFile) {
                const cloudinaryResponse = await uploadToCloudinary(imageFile);
                if (!cloudinaryResponse) {
                    alert('Failed to upload image to Cloudinary.');
                    setLoading(false);
                    return;
                }
                imageURL = cloudinaryResponse.secure_url;
            }

            const updatedData = {
                title,
                category,
                author,
                date: new Date(date).toISOString(),
                description,
                image: imageURL,
            };

            const response = await fetch(`/api/contents/edit?id=${contentItem._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const data = await response.json();
                onSave(data);
                onClose();
                window.location.reload();
            } else {
                console.error('Failed to update content item:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating content:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <EditLoader />;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.formHeader}>
                    <img src={logo.src} className={styles.cryptPH} />
                    <FaWindowClose className={styles.closeButton} onClick={onClose}/>
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.contentTitleContainer}>
                        <h2 className={styles.modalHeaderSub}>Content Title</h2>
                        <input
                            type="text"
                            placeholder="Content Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles.titleInput}
                        />
                        <h2 className={styles.modalHeaderSub}>Category</h2>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={styles.dropdown}
                        >
                            <option value="News">News</option>
                            <option value="Education">Educational Article</option>
                        </select>
                    </div>
                </div>
                <div className={styles.fileInputContainer}>
                    <h2 className={styles.fileLabel}>Content Image</h2>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={handleImageChange}
                        className={styles.fileInput}
                    />
                    <h2 className={styles.modalHeaderSub}>Authors</h2>
                    <input
                        type="text"
                        placeholder="Content Authors"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className={styles.textInput}
                    />
                    <h2 className={styles.modalHeaderSub}>Date Published</h2>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={styles.textInput}
                    />
                </div>

                <ReactQuill
                    value={description}
                    onChange={setDescription}
                    className={styles.quillEditor}
                    theme="snow"
                    modules={modules}
                />
                <div className={styles.bottomFormContainer}>
                    <h2 className={styles.modalHeaderMain}>Edit Content</h2>
                    <div className={styles.modalActions}>
                        <button onClick={handleSubmit} className={styles.ModalSave}>Save</button>
                        <button onClick={onClose} className={styles.ModalCancel}>Cancel</button>
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
    const [loading, setLoading] = useState(false);
    
     // Set the current date in YYYY-MM-DD format
     const currentDate = new Date();
     const formattedDate = currentDate.toLocaleDateString('en-CA');
     
    //today's date
    useEffect(() => {
        setDate(formattedDate);
    }, [formattedDate]);

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

        const cloudinaryResponse = await uploadToCloudinary(imageFile);
        if (!cloudinaryResponse) {
            alert('Failed to upload image to Cloudinary.');
            return;
        }

        const formData = {
            title,
            category,
            author,
            date: formattedDate,
            description,
            image: cloudinaryResponse.secure_url, // Send the base64 string
        };

        setLoading(true);

        try {
            const response = await fetch('/api/contents/add', {
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
                window.location.reload();

            } else {
                const errorData = await response.json();
                console.error("Failed to add news:", errorData);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    const uploadToCloudinary = async (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'cryptph_images'); // Use your Cloudinary upload preset here
        formData.append('cloud_name', 'dukv38hdq'); // Your Cloudinary cloud name

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dukv38hdq/image/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error('Failed to upload image');
                return null;
            }
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            return null;
        }
    };


    if (loading) {
        return <AddLoader/>;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.formHeader}>
                    <img src={logo.src} className={styles.cryptPH} />
                    <FaWindowClose className={styles.closeButton} onClick={onClose}/>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formContainer}>
                        <div className={styles.contentTitleContainer}>
                            <h2 className={styles.modalHeaderSub}>Content Title</h2>
                            <input
                                type="text"
                                placeholder="Content Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={styles.titleInput}
                                required
                            />
                            <h2 className={styles.modalHeaderSub}>Category</h2>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={styles.dropdown}
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="News">News</option>
                                <option value="Education">Educational Article</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.fileInputContainer}>
                        <h2 className={styles.fileLabel}>Content Image</h2>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={styles.fileInput}
                        />
                        <h2 className={styles.modalHeaderSub}>Authors</h2>
                        <input
                            type="text"
                            placeholder="Content Authors"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className={styles.textInput}
                            required
                        />
                        <h2 className={styles.modalHeaderSub}>Date Published</h2>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={styles.textInput}
                            required
                            min={formattedDate} // Prevent selecting past dates
                            max={formattedDate} // Prevent selecting future dates
                        />
                    </div>
                    <ReactQuill
                        value={description}
                        onChange={setDescription}
                        className={styles.quillEditor}
                        theme="snow"
                        modules={modules}
                    />
                    <div className={styles.bottomFormContainer}>
                        <h2 className={styles.modalHeaderMain}>New Content</h2>
                        <div className={styles.modalActions}>
                            <button type="submit" className={styles.ModalSave}>Save</button>
                            <button onClick={onClose} type="button" className={styles.ModalCancel}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};


const HeroPage = () => {

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
    const [contentData, setContentData] = useState([]);
    const [contentItem, setContentItem] = useState(null);
    const [selectedContentItem, setSelectedContentItem] = useState(null);

    const [filteredContentData, setFilteredContentData] = useState([]); // For filtering and searching
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; 

    

    const [hoveredButton, setHoveredButton] = useState(null);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isSearchHovered, setIsSearchHovered] = useState(false);

    const [intervalId, setIntervalId] = useState(null); 


    //loading
     const [loading, setLoading] = useState(true);
     const [deleteLoading, setDeleteLoading] = useState(false);

    //fetch news from db

    //fetch 
    useEffect(() => {
        const fetchContents = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/contents/fetch');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
    
                // Confirm the fetched data structure
                console.log('Fetched news data:', data);
    
                // Sort the news by the "date" field in descending order (latest first)
                const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    
                // Set the sorted data
                setContentData(sortedData); // Assuming you have useState for newsData
                setFilteredContentData(sortedData); // Initial set, sorted by date
            } catch (error) {
                console.error('Error fetching news:', error);
            }finally {
                setLoading(false);
            }
        };
    
        fetchContents();

        // const intervalId = setInterval(() => {
        //     fetchNews();
        // }, 1500); //

        // // Clear the interval on component unmount
        // return () => clearInterval(intervalId);
    }, []);
    


     // Handle search
     useEffect(() => {

        if (intervalId) {
            clearInterval(intervalId);
        }

        const filteredData = contentData.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredContentData(filteredData);
        setCurrentPage(1); // Reset to first page on new search

        // const id = setInterval(() => {
        //     fetchNews();
        // }, 1500);
        // setIntervalId(id);

        // // Cleanup function to clear the interval on search change
        // return () => clearInterval(id);

    }, [searchQuery, contentData, intervalId]);

    // Handle pagination
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginatedData = filteredContentData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Handle sorting
    const toggleSort = (key) => {
        const sortedData = [...filteredContentData].sort((a, b) => {
            if (sortState[key] === 'asc') {
                return a[key] > b[key] ? -1 : 1;
            }
            return a[key] < b[key] ? -1 : 1;
        });
        setFilteredContentData(sortedData);
        setSortState((prev) => ({ ...prev, [key]: prev[key] === 'asc' ? 'desc' : 'asc' }));
    };
    
    //modals

    const handleEditClick = (item) => {
        setContentItem(item); // Set the selected news item
        console.log("Editing news item:", item); // Log the news item being edited
        setIsModalOpen(true); // Open the edit modal
    };


    const handleDeleteClick = async (id , imagePublicId) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            setDeleteLoading(true);
            try {

                console.log('Deleting content with id:', id, 'and imagePublicId:', imagePublicId); // Log for debugging

                const response = await fetch(`/api/contents/delete?id=${id}&imagePublicId=${imagePublicId}`, {
                    method: 'DELETE',
                });
    
                if (response.ok) {
                    // Update local state to remove deleted item
                    setContentData((prevData) => prevData.filter((item) => item._id !== id));
                } else {
                    console.error('Failed to delete news item');
                }
            } catch (error) {
                console.error('Error deleting news item:', error);
            } finally {
                setDeleteLoading(false);
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
            const response = await fetch(`/api/news/edit/${contentItem._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
    
            if (response.ok) {
                const updatedItem = await response.json();
                // Update local state
                setContentData((prevData) =>
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
        if (contentItem) {
            setTitle(contentItem.title);
            setCategory(contentItem.category);
            setAuthor(contentItem.author);
            setDate(contentItem.date);
            setDescription(contentItem.description);
            setImageFile(contentItem.image);
        }
    }, [contentItem]);
    

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
                console.log(contentItem.image);

                // Close modal or reset form as needed
            } else {
                const errorData = await response.json(); // Get error details
                console.error("Failed to add news:", errorData);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
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


    if (loading) {
        return <Loader />;
    }

    if (deleteLoading) {
        return <DeleteLoader />;
    }

      return (
        <Layout pageTitle="Manage Contents - CryptPH Admin">
            <Head></Head>
            <div className={styles.pageContainer}>
                <h1 className={styles.pageHeader}>Contents</h1>
    
                <div className={styles.actionContainer}>
                    <button onClick={handleAddClick} className={styles.addNewButton}>
                        Add New
                        <IoIosAddCircle className={styles.addNewIcon} />
                    </button>

                    <div className={styles.sortButtons}>
                        <button className={styles.sortButton} onClick={() => toggleSort('title')}>Sort by Title</button>
                        <button className={styles.sortButton} onClick={() => toggleSort('category')}>Sort by Category</button>
                        <button className={styles.sortButton} onClick={() => toggleSort('date')}>Sort by Date</button>
                    </div>

                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                
    
                <div className={styles.cardsContainer}>
                {paginatedData.length > 0 ? (
                        paginatedData.map((contentItem) => (
                        <Card key={contentItem._id}>
                                <Link href={contentItem.category === "Education" ? `/educational/${contentItem._id}` : `/news/${contentItem._id}`} legacyBehavior>
                                <a>
                                    <img src={contentItem.image} alt={contentItem.title} className={styles.cardImage} />
                                </a>
                            </Link>   

                            
                            <h1 className={styles.cardName}>{contentItem.title.length > 20 ? `${contentItem.title.substring(0, 20)}...` : contentItem.title}</h1>
                            
                            <p className={styles.cardInfo}>
                                {stripHtmlTags(contentItem.description).substring(0, 50)}...
                            </p>
    
                            <div className={styles.categoryGroup}>
                                <p className={styles.cardHeader}>Category</p>
                                <p className={styles.cardInfo}>{contentItem.category}</p>
                            </div>
                            <div className={styles.categoryGroup}>
                                <p className={styles.cardHeader}>Date Created</p>
                                <p className={styles.cardInfo}>{new Date(contentItem.date).toLocaleDateString()}</p>
                            </div>
                            <div className={styles.categoryGroup}>
                                <p className={styles.cardHeader}>Authors</p>
                                <p className={styles.cardInfo}>{contentItem.author}</p>
                            </div>
                            <div className={styles.iconGroup}>
                                <button onClick={() => handleEditClick(contentItem)}><FaRegEdit className={styles.cardIcon} /></button>
                                <button><FaRegTrashAlt className={styles.cardIcon} onClick={() => handleDeleteClick(contentItem._id, contentItem.imagePublicId)} /></button>
                            </div>
                        </Card>
                        ))
                    ) : (
                        <p className={{ textAlign: 'center', marginTop: '20px', fontSize: '18px' }}>
                            No Content Being Displayed.
                        </p>
                    )}
                </div>

                <div className={styles.pagination}>
                    {Array.from({ length: Math.ceil(filteredContentData.length / itemsPerPage) }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={index + 1 === currentPage ? styles.activePage : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
    
                <EditModal 
                    show={isModalOpen}
                    onClose={handleCloseModal}
                    contentItem={contentItem} // Pass the currently selected news item here
                    onSave={handleSave}
                />
                <AddModal show={isAddModalOpen} onClose={handleAddCloseModal} />
    
            </div>
        </Layout>
    );    
}

export default withAdminAuth(HeroPage);