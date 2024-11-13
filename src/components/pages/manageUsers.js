import React, { useMemo, useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import Layout from '../Layout/adminIndex';
import Head from 'next/head';
import styles from '@/styles/manageUsers.module.css';
import { FaUserAlt } from "react-icons/fa";
import withAdminAuth from '@/pages/api/auth/withAdminAuth';

const HeroPage = () => {
  const [users, setUsers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 15 });

  // Fetching data (You should replace this with your API call)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/auth/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const columns = useMemo(() => [
    { accessorKey: '_id', header: 'UserID' },
    { accessorKey: 'firstName', header: 'First Name' },
    { accessorKey: 'lastName', header: 'Last Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' }
  ], []);

  const table = useReactTable({
    data: users,
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
    <Layout pageTitle="Manage Users - CryptPH Admin">
      <div className={styles.container}>
        <h1 className={styles.title}>Manage Users</h1>

        <div className={styles.recordContainer}>
          <div className={styles.panel1}>
            <h1 className={styles.numberText}>{users.length}</h1>
            <span className={styles.headerGroup}>
              <FaUserAlt className={styles.userIcon} />
              <h1 className={styles.header1}>Accounts Registered</h1>
            </span>
          </div>
          <div className={styles.panel2}>
            <span className={styles.recordGroup}>
              <h1 className={styles.numberText2}>{users.filter(user => user.role === 'user').length}</h1>
              <h1 className={styles.header2}>Regular Users</h1>
            </span>

            <span className={styles.recordGroup}>
              <h1 className={styles.numberText2}>{users.filter(user => user.role === 'admin').length}</h1>
              <h1 className={styles.header2}>Administrators</h1>
            </span>
          </div>
        </div>

        {/* Global Filter (Search) */}
        <input
          type="text"
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search by Lastname, Firstname, Email or Role"
          className={styles.search}
        />

        {/* Table */}
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <span>
                      {header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

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
      </div>
    </Layout>
  );
};

export default withAdminAuth(HeroPage);
