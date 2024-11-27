// @/components/Layout/Sidebar.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

import { SlHome } from 'react-icons/sl';
import { FiBarChart, FiBook, FiLogOut } from "react-icons/fi";
import { MdOutlineNewspaper } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import jwt from 'jsonwebtoken';// Correct import

import logo from '@/img/logo.png';

export default function Sidebar() {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const { data: session } = useSession(); // Get the session data
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token found:", token); // Debug: Check if token is retrieved
    
        if (token) {
          try {
            const decoded = jwt.decode(token); // Use jwt.decode() to decode without verification
            setUser(decoded); // Set user from decoded token payload
          } catch (error) {
            console.error("Error decoding token:", error); // Log decoding errors
          }
        }
      }, []);

    // Define our base class
    const className = `bg-[#0B162B] border-r border-white transition-[width] ease-in-out duration-500 
    fixed top-0 bottom-0 left-0 z-40 ${isHovered ? "w-[250px]" : "w-[60px]"} 
    ${isHovered || isHovered ? 'block' : 'hidden'} md:block`; // Hide on mobile size

    // Clickable menu items
    const MenuItem = ({ icon, name, route, onClick }) => {
        // Highlight menu item based on currently displayed route
        const colorClass = router.pathname === route ? "text-white" : "text-white/50 hover:text-white";

        if (onClick) {
            return (
                <div
                    className={`flex items-center gap-3 px-4 py-3 ${colorClass} ${isHovered ? "justify-start" : "justify-center"}`}
                    onClick={onClick} // Trigger onClick function if passed (for logout)
                >
                    <div className="text-xl">
                        {icon}
                    </div>
                    {isHovered && (
                        <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', fontWeight: '500' }}>
                            {name}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Link
                href={route}
                className={`flex items-center gap-3 px-4 py-3 ${colorClass} ${isHovered ? "justify-start" : "justify-center"}`}
            >
                <div className="text-xl">
                    {icon}
                </div>
                {isHovered && (
                    <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', fontWeight: '500' }}>
                        {name}
                    </div>
                )}
            </Link>
        );
    }

     // Handle logout
     const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('user'); // Clear user-related session data
    
        setUser(null); 
    
    
        signOut({ callbackUrl: '/' }); // Redirect to home page after logout
    };

    return (
        <div
            className={className}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col items-center h-full">
                <div className="p-4">
                    <Link href="/">
                        {/*eslint-disable-next-line*/}
                        <img src={logo.src} alt="Company Logo" className={`${isHovered ? "block" : "hidden"}`} width={150} height={150} />
                    </Link>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <MenuItem name="Dashboard" route="/" icon={<SlHome />} />
                    <MenuItem name="Charts" route="/charts" icon={<FiBarChart />} />
                    <MenuItem name="News" route="/news" icon={<MdOutlineNewspaper />} />
                    <MenuItem name="Learn" route="/learn" icon={<FiBook />} />
                    {session || user ? ( // Check if session exists (authenticated)
                        <>
                            <MenuItem name="Virtual Trading" route="/virtual-trading" icon={<FaExchangeAlt />} />
                            <MenuItem name="Logout" icon={<FiLogOut />} onClick={handleLogout} />
                        </>
                    ) : (
                        // If not authenticated
                        <MenuItem name="Virtual Trading" route="/Login" icon={<FaExchangeAlt />} />
                    )}
                </div>
                <div className="mt-auto p-4"></div>
            </div>
        </div>
    );
}
