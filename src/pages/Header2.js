import React, { useState } from 'react';
import { FaRegBell, FaUserCircle } from "react-icons/fa";
import logo from '@/img/logo.png';
import { MdBorderBottom } from 'react-icons/md';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [bellDropdownOpen, setBellDropdownOpen] = useState(false);
  

  const toggleUserDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setBellDropdownOpen(false); // Close bell dropdown if open
  };

  const toggleBellDropdown = () => {
    setBellDropdownOpen(!bellDropdownOpen);
    setDropdownOpen(false); // Close user dropdown if open
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <FaRegBell style={styles.bellIcon} onClick={toggleBellDropdown} />
        <div className="user-dropdown" onClick={toggleUserDropdown} style={styles.userDropdown}>
          <div className="user" style={styles.user}>
            <FaUserCircle style={styles.userIcon} />
            <div style={styles.username}>Username</div>
          </div>
        </div>
      </div>

      <img src={logo.src} style={styles.centerImage} alt="Logo" />
      
      {dropdownOpen && (
        <div className="dropdown-menu" style={styles.dropdownMenu}>
          <ul style={styles.menuList}>
            <li style={styles.menuItem}><a href="/Profile">Profile</a></li>
            <li style={styles.menuItem}><a href="/Login">Login</a></li>
          </ul>
        </div>
      )}

      {bellDropdownOpen && (
        <div className="dropdown-menu" style={styles.dropdownMenu}>
          <ul style={styles.menuList}>
            <li style={styles.menuItem}><a href="/Notifications">No Notifications</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}
const styles = {
  header: {
    backgroundColor: '#0B162B',
    padding: '20px 0',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #fff',
    
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 20px',
  },
  bellIcon: {
    color: '#fff',
    fontSize: '20px',
    marginRight: '20px',
    cursor: 'pointer',
  },
  userDropdown: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: '5px 10px',
    borderRadius: '20px', // Added border-radius for smoother look
  },
  userIcon: {
    color: '#fff',
    fontSize: '25px', // Increased size for better visibility
  },
  username: {
    color: '#fff',
    marginLeft: '10px',
    fontSize: '16px', // Adjusted font size for consistency
    fontWeight: '500', // Added font-weight for better visibility
    whiteSpace: 'nowrap', // Prevents text from wrapping
  },
  dropdownMenu: {
    position: 'absolute',
    right: '0',
    top: '50px',
    backgroundColor: '#0B162B',
    borderRadius: '8px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    width: '180px',
    color: '#fff',
  },
  menuList: {
    listStyleType: 'none',
    padding: '10px 0',
    margin: 0,
  },
  menuItem: {
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '14px',
  },
  menuItemHover: {
    backgroundColor: '#f0f0f0',
  },
  centerImage: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%,-70%)',   
    height: '80px', 
    maxWidth: '350px', 

  },
};
