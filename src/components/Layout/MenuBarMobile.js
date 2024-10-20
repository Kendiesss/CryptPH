// @/components/Layout/MenuBarMobile.js
import React, { useState } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa'; 
import logo from '@/img/logo.png'; 

const Icon = () => <div className="text-white">☰</div>; // Keep the toggle icon white for contrast

export default function MenuBarMobile({ setter }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prevState) => !prevState); // Toggle menuOpen state
        setter((prevState) => !prevState); // Pass the updated state up using setter
    };

    return (
        <nav className="md:hidden z-20 fixed top-0 left-0 right-0 bg-gray-800 shadow-lg transition-all font-sora">
            <div className={`flex items-center justify-between h-[60px] px-2`}>
                <button className="text-4xl text-white" onClick={toggleMenu}>
                    <Icon /> {/* Toggle button for menu */}
                </button>
                <Link href="/" className="mx-auto">
                    <img src={logo.src} alt="Company Logo" width={70} height={70} /> {/* Increased logo size */}
                </Link>
                <Link className="text-3xl text-white" href="/login">
                    <FaUser /> {/* User icon */}
                </Link>
            </div>

            {menuOpen && (
                <div className="flex flex-col items-center space-y-4 p-4 bg-gray-800 transition-all duration-300 w-full overflow-x-hidden">
                    <Link href="/" className="text-white text-lg font-sora">Dashboard</Link>
                    <Link href="/charts" className="text-white text-lg font-sora">Charts</Link>
                    <Link href="/news" className="text-white text-lg font-sora">News</Link>
                    <Link href="/learn" className="text-white text-lg font-sora">Learn</Link>
                    <Link href="/virtual-trading" className="text-white text-lg font-sora">Virtual Trading</Link>
                </div>
            )}
        </nav>
    );
}
