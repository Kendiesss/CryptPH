// @/components/Layout/MenuBarMobile.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import logo from '@/img/logo.png';
import { useSession, signOut } from 'next-auth/react';
import jwt from 'jsonwebtoken'; // Correct import
import { useRouter } from 'next/router'; // Import useRouter

const Icon = () => <div className="text-white">☰</div>; // Keep the toggle icon white for contrast

export default function MenuBarMobile({ setter }) {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter(); // Initialize router

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

    // Handle sign out
    const handleSignOut = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setUser(null); // Clear user state
        signOut(); // Use next-auth's signOut function
        router.push('/login'); // Redirect to login page
    };

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
                {session?.user?.image ? (
                    <Link className="text-3xl text-white" href="/profile">
                        <img
                            src={session.user.image}
                            alt="User Profile"
                            style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '30px',
                            }} // Adjust size here
                        />
                    </Link>
                ) : user?.role === 'user' ? (
                    <Link className="text-3xl text-white" href="/profile">
                        <FaUser /> {/* If token role is 'user', link to /profile */}
                    </Link>
                ) : (
                    <Link className="text-3xl text-white" href="/login">
                        <FaUser /> {/* If no image and no valid token, link to /login */}
                    </Link>
                )}
            </div>

            {menuOpen && (
                <div className="flex flex-col items-center space-y-4 p-4 bg-gray-800 transition-all duration-300 w-full overflow-x-hidden">
                    <Link href="/admin-dashboard" className="text-white text-lg font-sora">Dashboard</Link>
                    <Link href="/manageContents" className="text-white text-lg font-sora">Manage Contents</Link>
                    <Link href="/manageUsers" className="text-white text-lg font-sora">Manage Users</Link>
                    <Link href="/charts" className="text-white text-lg font-sora">Charts</Link>
                    <Link href="/news" className="text-white text-lg font-sora">News</Link>
                    <Link href="/learn" className="text-white text-lg font-sora">Learn</Link>

                    {session || user?.role ? (
                        <>
                            <Link href="/virtual-trading" className="text-white text-lg font-sora">Virtual Trading</Link>
                            <button onClick={handleSignOut} className="text-white text-lg font-sora">Logout</button> {/* Logout button triggers sign-out */}
                        </>
                    ) : (
                        <Link href="/Login" className="text-white text-lg font-sora">Virtual Trading</Link>
                    )}
                </div>
            )}
        </nav>
    );
}
