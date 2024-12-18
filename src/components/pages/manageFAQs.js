import React, { useMemo, useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import Layout from '../Layout/adminIndex';
import Head from 'next/head';
import styles from '@/styles/manageFAQs.module.css';
import withAdminAuth from '@/pages/api/auth/withAdminAuth';


const SuccessModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Success</h2>
        <p className={styles.modalMessage}>{message}</p>
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.confirmButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{title}</h2>
        <p className={styles.modalMessage}>{message}</p>
        <div className={styles.modalActions}>
          {onConfirm && (
            <button onClick={onConfirm} className={styles.confirmButton}>
              Confirm
            </button>
          )}
          {onCancel && (
            <button onClick={onCancel} className={styles.cancelButton}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


const manageFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [showForm, setShowForm] = useState(false);

   // Modals
   const [successModalState, setSuccessModalState] = useState({ isOpen: false, message: '' });
   const [confirmationModalState, setConfirmationModalState] = useState({
     isOpen: false,
     title: '',
     message: '',
     onConfirm: null,
     onCancel: null,
   });

    // Function to open success modal
  const openSuccessModal = (message) => {
    setSuccessModalState({ isOpen: true, message });
  };

  // Function to close success modal
  const closeSuccessModal = () => {
    setSuccessModalState({ isOpen: false, message: '' });
  };

  const openConfirmationModal = (title, message, onConfirm, onCancel) => {
    setConfirmationModalState({
      isOpen: true,
      title,
      message,
      onConfirm,
      onCancel,
    });
  };

  // Function to close confirmation modal
  const closeConfirmationModal = () => {
    setConfirmationModalState({
      isOpen: false,
      title: '',
      message: '',
      onConfirm: null,
      onCancel: null,
    });
  };

  // Fetching FAQ data
  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/faqs/fetch'); // Replace with your API endpoint
      const data = await response.json();
      setFaqs(data);
      console.log("Fetched FAQs:", data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleAddFAQ = () => {
    setSelectedFAQ(null);
    setShowForm(true);
  };

  const handleEditFAQ = (faq) => {
    setSelectedFAQ(faq);
    setShowForm(true);
  };

  const handleDeleteFAQ = async (faqId) => {
    openConfirmationModal(
      'Delete FAQ',
      'Are you sure you want to delete this FAQ?',
      async () => {
        try {
          await fetch(`/api/faqs/delete?id=${faqId}`, { method: 'DELETE' });
          setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq._id !== faqId));
          openSuccessModal('FAQ deleted successfully!');
        } catch (error) {
          console.error('Error deleting FAQ:', error);
        }
        closeConfirmationModal();
      },
      closeConfirmationModal
    );
  };


  const handleHideFAQ = async (faqId, currentVisibility) => {
    try {
      // Toggle visibility value
      const newVisibility = currentVisibility === "hidden" ? "visible" : "hidden";
  
      // Send the updated visibility to the API
      await fetch(`/api/faqs/visibility?id=${faqId}`, {
        method: 'PATCH', // Use PATCH method for partial update
        body: JSON.stringify({ visibility: newVisibility }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Update the local state with the new visibility
      setFaqs((prevFaqs) =>
        prevFaqs.map((faq) =>
          faq._id === faqId ? { ...faq, visibility: newVisibility } : faq
        )
      );
  
      // Display success message
      openSuccessModal('FAQ visibility updated!');
    } catch (error) {
      console.error('Error updating FAQ visibility:', error);
    }
  };


  const columns = useMemo(
    () => [
      { accessorKey: '_id', header: 'FAQ ID' },
      {
        accessorKey: 'question',
        header: 'Question',
        cell: ({ getValue }) => (
          <div className={styles.questionCell}>{getValue()}</div>
        ),
      },
      {
        accessorKey: 'answer',
        header: 'Answer',
        cell: ({ getValue }) => (
          <div className={styles.answerCell}>{getValue()}</div>
        ),
      },
      { accessorKey: 'category', header: 'Category' },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className={styles.actions}>
            <button onClick={() => handleEditFAQ(row.original)} className={styles.editBtn}>Edit</button>
            <button onClick={() => handleDeleteFAQ(row.original._id)} className={styles.delBtn}>Delete</button>
            <button
            onClick={() => handleHideFAQ(row.original._id, row.original.visibility)}
            className={styles.hideBtn}
            >
            {row.original.visibility === "hidden" ? 'Unhide' : 'Hide'}
          </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: faqs,
    columns,
    state: { globalFilter, sorting, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Layout pageTitle="Manage FAQs - CryptPH Admin">
      <div className={styles.container}>
        <h1 className={styles.title}>Manage FAQs</h1>

        {/* Global Filter (Search) */}
        <input
          type="text"
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search FAQs by Question, Answer, or Category"
          className={styles.search}
        />

        <button className={styles.addButton} onClick={handleAddFAQ}>  + ADD Frequently Asked Question (FAQ) </button>

        {/* Table */}
        <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <span>
                      {header.column.getIsSorted()
                        ? header.column.getIsSorted() === 'desc'
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
       
        {/* Pagination */}
        <div className={styles.pagination}>
          <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
            {'<<'}
          </button>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            {'<'}
          </button>
          <span>
            Page{' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>{' '}
          </span>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            {'>'}
          </button>
          <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
            {'>>'}
          </button>
        </div>

         {/* Success Modal */}
         <SuccessModal
          isOpen={successModalState.isOpen}
          message={successModalState.message}
          onClose={closeSuccessModal}
        />

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={confirmationModalState.isOpen}
          title={confirmationModalState.title}
          message={confirmationModalState.message}
          onConfirm={confirmationModalState.onConfirm}
          onCancel={confirmationModalState.onCancel}
        />

        {/* FAQ Form Modal */}
        {showForm && (
          <FAQForm
            faq={selectedFAQ}
            onClose={() => setShowForm(false)}
            onSave={(newFAQ) => {
              if (selectedFAQ) {
                // Edit FAQ
                setFaqs((prevFaqs) =>
                  prevFaqs.map((faq) => (faq._id === newFAQ._id ? newFAQ : faq))
                );
              } else {
                // Add FAQ
                setFaqs((prevFaqs) => [...prevFaqs, newFAQ]);
              }
              setShowForm(false);
              fetchFAQs(); // Refresh FAQs list after adding or editing
            }}
          />
        )}
      </div>
    </Layout>
  );
};

const FAQForm = ({ faq, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    faq || { question: '', answer: '', category: '' }
  );

  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(true);

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.question) {
      newErrors.question = 'Question is required.';
    } else if (formData.question.length < 10) {
      newErrors.question = 'Question must be at least 10 characters.';
    }

    if (!formData.answer) {
      newErrors.answer = 'Answer is required.';
    } else if (formData.answer.length < 20) {
      newErrors.answer = 'Answer must be at least 20 characters.';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

     // Close the form and show confirmation modal
    setIsFormOpen(false);
    setShowConfirmation(true);
    setConfirmationAction(() => () => handleConfirmSubmit());
  };

  // Handle Confirmation
  const handleConfirmSubmit = async () => {
    try {
      // Check if all necessary form data fields are filled
      if (!formData.question || !formData.answer || !formData.category) {
        alert('Please fill in all fields.');
        return;
      }

      // Ensure 'createdAt' is included before submitting
      const newFAQ = { 
        ...formData, 
        createdAt: new Date().toISOString() // Add the current date and time
      };

      const method = faq ? 'PUT' : 'POST'; // Use POST for new FAQ, PUT for updating
      const endpoint = faq ? `/api/faqs/edit?id=${faq._id}` : '/api/faqs/add';

      // Send the request
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFAQ),
      });

      const savedFAQ = await response.json();

      // Handle the response after saving FAQ
      onSave(savedFAQ);

      // Reset form data if adding a new FAQ
      if (!faq) {
        setFormData({ question: '', answer: '', category: '', createdAt: '' });
      }

      // Show success modal
      setShowSuccess(true);
      setShowConfirmation(false);

    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
    setIsFormOpen(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onClose();  // Close the form/modal after success
  };

  return (
    <>
    {/* Success Modal */}
    <SuccessModal
        isOpen={showSuccess}
        message={faq ? 'FAQ updated successfully!' : 'FAQ added successfully!'}
        onClose={handleCloseSuccess}
    />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        title={faq ? 'Update FAQ' : 'Add FAQ'}
        message={faq ? 'Are you sure you want to update this FAQ?' : 'Are you sure you want to add this FAQ?'}
        onConfirm={confirmationAction}
        onCancel={handleCancelConfirmation}
    />

  {isFormOpen && (
      <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>{faq ? 'Edit FAQ' : 'Add FAQ'}</h2>
              <form onSubmit={handleSubmit}>
              {errors.question && <span className={styles.errorMessage}>{errors.question}</span>}
                <input
                  className={styles.inputField}
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Question"
                  required
                />
              {errors.answer && <span className={styles.errorMessage}>{errors.answer}</span>}
                <textarea
                  className={styles.textareaField}
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Answer"
                  required
                />
              {errors.category && <span className={styles.errorMessage}>{errors.category}</span>}
                <select
                  className={styles.selectField}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="About Us">About Us</option>
                  <option value="Accounts/Login/Register">Accounts/Login/Register</option>
                  <option value="Charts">Charts</option>
                  <option value="Virtual Trading">Virtual Trading</option>
                  <option value="Educational Content">Educational Content</option>
                  <option value="Others">Others</option>
                </select>
                
                <button className={styles.submitButton} type="submit">Save</button>
                <button className={styles.cancelButton} type="button" onClick={onClose}>Cancel</button>
              </form>
            </div>
        </div>
      )}
    </>
  );
};

export default withAdminAuth(manageFAQs);
