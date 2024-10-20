// @/components/Layout/index.js
import React, { useState } from 'react';
import Head from 'next/head';
import Sidebar from './adminSidebar';
import MenuBarMobile from './adminMenuBar';
// Import the Header component

export default function Layout({ pageTitle, children }) {
    // Concatenate page title (if exists) to site title
    let titleConcat = "CryptPH";
    if (pageTitle) titleConcat = pageTitle + " | " + titleConcat;

    // Mobile sidebar visibility state
    const [showSidebar, setShowSidebar] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // Track mobile menu state

    return (
        <>
            <Head>
                <title>{titleConcat}</title>
            </Head>
            <div className="min-h-screen">
                {/* Place MenuBarMobile above the header */}
                <MenuBarMobile setter={setMenuOpen} />

                {/* Adjust padding based on whether the menu is open */}
                <div className={`flex flex-col flex-grow w-screen md:w-full transition-all ${menuOpen ? 'pt-[300px]' : 'pt-[60px]'}`}>
                    {children}
                </div>

                <Sidebar show={showSidebar} setter={setShowSidebar} />
            </div>
        </>
    );
}
