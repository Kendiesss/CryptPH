// components/Layout/index.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import MenuBarMobile from './MenuBarMobile';
import AdminSidebar from './adminSidebar'; // Import admin sidebar
import AdminMenuBar from './adminMenuBar'; // Import admin mobile menu
import { useSession } from 'next-auth/react'; // Import useSession for session management
import jwt from 'jsonwebtoken'; 

export default function Layout({ pageTitle, children }) {
  // Concatenate page title (if exists) to site title
  let titleConcat = "CryptPH";
  if (pageTitle) titleConcat = pageTitle + " | " + titleConcat;

  const [showSidebar, setShowSidebar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Track mobile menu state
  const [role, setRole] = useState(null); // State to track user role
  const { data: session } = useSession();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (token) {
        try {
          const decoded = jwt.decode(token); // Decode the token without verification
          console.log("Decoded token:", decoded); // Debug: Check the decoded token payload
          
          if (decoded && decoded.role) {
            setRole(decoded.role); // Set the role from the decoded token
          } else {
            setRole('user'); // Default to 'user' if no role in token
          }
        } catch (error) {
          console.error("Error decoding token:", error); // Log decoding errors
          setRole('user'); // Default to 'user' if there's an error
        }
      } else {
        setRole('user'); // Default to 'user' if no token is found
      }
    }, []); // Only runs once when the component mounts
  

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
