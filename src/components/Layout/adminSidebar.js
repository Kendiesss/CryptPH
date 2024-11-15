// @/components/Layout/Sidebar.js
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react';
import { SlHome } from 'react-icons/sl'
import { FiBarChart, FiBook, FiDatabase  } from "react-icons/fi";
import { MdOutlineNewspaper } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaExchangeAlt } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import logo from '@/img/logo.png'
import jwt from 'jsonwebtoken';// Correct import

export default function Sidebar() {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const { data: session } = useSession(); 
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            try {
                const decoded = jwt.decode(token);
                if (decoded && decoded.exp > Date.now() / 1000) {
                    setUser(decoded);
                } else {
                    console.log("Token expired");
                }
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    const className = `bg-[#0B162B] border-r border-white transition-[width] ease-in-out duration-500 
    fixed top-0 bottom-0 left-0 z-40 ${isHovered ? "w-[250px]" : "w-[60px]"} 
    ${isHovered || isHovered ? 'block' : 'hidden'} md:block`;

    const MenuItem = ({ icon, name, route, onClick }) => {
        const colorClass = router.pathname === route ? "text-white" : "text-white/50 hover:text-white";

        return (
            <Link
                href={route}
                className={`flex items-center gap-3 px-4 py-3 ${colorClass} ${isHovered ? "justify-start" : "justify-center"}`}
                onClick={onClick} 
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null); 
        signOut({ callbackUrl: '/' });
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
                        <img src={logo.src} alt="Company Logo" className={`${isHovered ? "block" : "hidden"}`} width={150} height={150} />
                    </Link>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <MenuItem name="Home" route="/admin-dashboard" icon={<SlHome />} />
                    <MenuItem name="Manage Contents" route="/manageContents" icon={<FiDatabase />} />
                    <MenuItem name="Manage Users" route="/manageUsers" icon={<FaUsersCog />} />
                    <MenuItem name="Charts" route="/charts" icon={<FiBarChart />} />
                    <MenuItem name="News" route="/news" icon={<MdOutlineNewspaper />} />
                    <MenuItem name="Learn" route="/learn" icon={<FiBook />} />
                    {session || user ? (
                        <>
                            <MenuItem name="Virtual Trading" route="/virtual-trading" icon={<FaExchangeAlt />} />
                            <button className="flex items-center gap-3 px-4 py-3 text-white" onClick={handleLogout}>
                                <FiLogOut />
                                {isHovered && <div>Logout</div>}
                            </button>
                        </>
                    ) : (
                        <MenuItem name="Virtual Trading" route="/Login" icon={<FaExchangeAlt />} />
                    )}
                </div>
            </div>
        </div>
    );
}
