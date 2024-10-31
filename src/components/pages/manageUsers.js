import React, { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import Layout from '../Layout/adminIndex';
import Head from 'next/head';
import styles from '@/styles/manageUsers.module.css';
import { FaUserAlt } from "react-icons/fa";


export default function HeroPage() {
    const data = useMemo(() => [
        { UserID: 1, Username: 'user1', Email: 'user1@example.com', Password: '****', AccountStatus: 'Verified' },
        { UserID: 2, Username: 'user2', Email: 'user2@example.com', Password: '****', AccountStatus: 'Pending Verification' },
        // Add more sample data here
    ], []);

    const columns = useMemo(() => [
        { accessorKey: 'UserID', header: 'UserID' },
        { accessorKey: 'Username', header: 'Username' },
        { accessorKey: 'Email', header: 'Email' },
        { accessorKey: 'Password', header: 'Password' },
        { accessorKey: 'AccountStatus', header: 'Account Status' }
    ], []);

    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 15 });

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            sorting,
            pagination,
        },
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
                        <h1 className={styles.numberText}>25</h1>
                        <span className={styles.headerGroup}>
                            <FaUserAlt className={styles.userIcon}/>
                            <h1 className={styles.header1}>Accounts Registered</h1>
                        </span>
                    </div>
                    <div className={styles.panel2}>

                        <span className={styles.recordGroup}>
                            <h1 className={styles.numberText2}>1</h1>
                            <h1 className={styles.header2}>Verified</h1>
                        </span>

                        <span className={styles.recordGroup}>
                            <h1 className={styles.numberText2}>1</h1>
                            <h1 className={styles.header2}>Pending Verification</h1>
                        </span>

                    </div>
                </div>
                
                {/* Global Filter (Search) */}
                <input
                    type="text"
                    value={globalFilter || ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search by username or email"
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
}
