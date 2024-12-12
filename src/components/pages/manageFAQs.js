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

const manageFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
    if (confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await fetch(`/api/faqs/delete?id=${faqId}`, {
          method: 'DELETE',
        });
        setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq._id !== faqId));
      } catch (error) {
        console.error('Error deleting FAQ:', error);
      }
    }
  };

  const handleHideFAQ = async (faqId) => {
    try {
      await fetch(`/api/faqs/${faqId}/hide`, {
        method: 'PATCH',
      });
      setFaqs((prevFaqs) =>
        prevFaqs.map((faq) =>
          faq._id === faqId ? { ...faq, hidden: !faq.hidden } : faq
        )
      );
    } catch (error) {
      console.error('Error hiding FAQ:', error);
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
            <button onClick={() => handleHideFAQ(row.original._id)} className={styles.hideBtn}>
              {row.original.hidden ? 'Unhide' : 'Hide'}
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if all necessary form data fields are filled
    if (!formData.question || !formData.answer || !formData.category) {
      alert('Please fill in all fields.');
      return;
    }
  
    try {
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
  
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{faq ? 'Edit FAQ' : 'Add FAQ'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.inputField}
            type="text"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            placeholder="Question"
            required
          />
          <textarea
            className={styles.textareaField}
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            placeholder="Answer"
            required
          />
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
  );
};

export default withAdminAuth(manageFAQs);
