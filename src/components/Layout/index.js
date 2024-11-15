// components/Layout/index.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import MenuBarMobile from './MenuBarMobile';
import AdminSidebar from './adminSidebar'; // Import admin sidebar
import AdminMenuBar from './adminMenuBar'; // Import admin mobile menu
import { useSession } from 'next-auth/react';
import jwt from 'jsonwebtoken'; 

export default function Layout({ pageTitle, children }) {
  // Concatenate page title (if exists) to site title
  let titleConcat = "CryptPH";
  if (pageTitle) titleConcat = pageTitle + " | " + titleConcat;

  const [showSidebar, setShowSidebar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Track mobile menu state
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwt.decode(token); // Use jwt.decode() to decode without verification
        setUser(decoded); // Set user from decoded token payload
      } catch (error) {
        console.error("Error decoding token:", error); // Log decoding errors
      }
    }
  }, []);

  const { data: session } = useSession();
  const role = session?.user?.role || user?.role || 'user';

  return (
    <>
      <Head>
        <title>{titleConcat}</title>
      </Head>
      <div className="min-h-screen">
        {/* Conditionally render MenuBarMobile and Sidebar based on role */}
        {role === 'admin' ? (
          <>
            <AdminMenuBar setter={setMenuOpen} />
            <AdminSidebar show={showSidebar} setter={setShowSidebar} />
          </>
        ) : (
          <>
            <MenuBarMobile setter={setMenuOpen} />
            <Sidebar show={showSidebar} setter={setShowSidebar} />
          </>
        )}
        
        <div
          className={`flex flex-col flex-grow w-screen md:w-full transition-all ${
            menuOpen ? 'pt-[300px]' : 'pt-[60px]'
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
