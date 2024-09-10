// @/components/Layout/Sidebar.js
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SlHome } from 'react-icons/sl'
import { FiBarChart, FiBook, FiDatabase  } from "react-icons/fi";
import { MdOutlineNewspaper } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaExchangeAlt } from "react-icons/fa";
import logo from '@/img/logo.png'

export default function adminSidebar() {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    // Define our base class
    // const className = `bg-[#0B162B] transition-[width] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40 ${isHovered ? "w-[250px]" : "w-[60px]"}`;

    const className = `bg-[#0B162B] border-r border-white transition-[width] ease-in-out duration-500 
    fixed top-0 bottom-0 left-0 z-40 ${isHovered ? "w-[250px]" : "w-[60px]"}`;

    // Clickable menu items
    const MenuItem = ({ icon, name, route }) => {
        // Highlight menu item based on currently displayed route
        const colorClass = router.pathname === route ? "text-white" : "text-white/50 hover:text-white";

        return (
            <Link
                href={route}
                className={`flex items-center gap-3 px-4 py-3 ${colorClass} ${isHovered ? "justify-start" : "justify-center"}`}
            >
                <div className="text-xl">
                    {icon}
                </div>
                {/* {isHovered && <div className="whitespace-nowrap">{name}</div>} */}
                {isHovered && (
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', fontWeight: '500' }}>
                    {name}
                </div>
            )}
            </Link>
        )
    }

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
                </div><br></br>
                <div className="flex flex-col items-center gap-2">
                    <MenuItem
                        name="Home"
                        route="/admin-dashboard"
                        icon={<SlHome />}
                    />
                    <MenuItem
                        name="Manage"
                        route="/manageContents"
                        icon={<FiDatabase />}
                    />
                    <MenuItem
                        name="Charts"
                        route="/charts"
                        icon={<FiBarChart />}
                    />
                    <MenuItem
                        name="News"
                        route="/news"
                        icon={<MdOutlineNewspaper />}
                    />
                    <MenuItem
                        name="Learn"
                        route="/learn"
                        icon={<FiBook />}
                    />
                    <MenuItem
                        name="Virtual Trading"
                        route="/virtual-trading"
                        icon={<FaExchangeAlt />}
                    />
                    <MenuItem
                        name="Logout"
                        route="/"
                        icon={<FiLogOut />}
                    />
                </div>
                <div className="mt-auto p-4">

                </div>
            </div>
        </div>
    )
}
