import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "./logo.png";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

export default function Header_home () {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    // Checks localStorage for auth token and user details to set the login state.
    const checkAuthStatus = () => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');

        if (token && name) {
            setIsLoggedIn(true);
            setUserName(name);
            setUserEmail(email || "");
        } else {
            setIsLoggedIn(false);
            setUserName("");
            setUserEmail("");
        }
    };

    useEffect(() => {
        checkAuthStatus(); // Check on initial load

        window.addEventListener('storage', checkAuthStatus); // Listen for storage changes
        return () => window.removeEventListener('storage', checkAuthStatus); // Cleanup listener
    }, []);

    // Effect to handle clicks outside the menu to close it
    useEffect(() => {
        const handleClickOutside = () => {
            if (isProfileMenuOpen) {
                setIsProfileMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isProfileMenuOpen]);

    // Clears user data from localStorage and navigates to the login page.
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('email');

        // Manually trigger a storage event for the current window to update the header
        window.dispatchEvent(new Event("storage"));

        navigate('/');
    };

    // Toggles the visibility of the user profile dropdown menu.
    const toggleProfileMenu = (e) => {
        e.stopPropagation(); 
        setIsProfileMenuOpen(prev => !prev);
    };

    return (
        <header id="header1">
            <div id="head1">
                <Link to="/" id="name">
                    <img src={logo} alt="mockT logo" id="logo"/>
                </Link>
                <Link id="link" to="/about">about</Link>
            </div>
            {isLoggedIn ? (
                <div id="head2-loggedIn" >
                    <div className="header-profile-container">
                        <button onClick={toggleProfileMenu} className="header-profile-link">
                            <AccountCircleTwoToneIcon className="header-profile-avatar" style={{fontSize: "30px", color: "#c4bcbc"}}/>
                            <span className="header-profile-name">{userName}</span>
                        </button>
                        {isProfileMenuOpen && (
                            <div className="profile-menu">
                                <div className="profile-menu-info" onClick={(e) => e.stopPropagation()}>
                                    <p className="profile-menu-name">{userName}</p>
                                    <p className="profile-menu-email">{userEmail}</p>
                                </div>
                                {/* <Link to="/profile" className="profile-menu-link">View Profile</Link> */}
                            </div>
                        )}
                    </div>
                    <button id="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div id="head2">
                    <Link to="/login"><button className="header-auth-btn">Login</button></Link>
                    <Link to="/signup"><button className="header-auth-btn">Signup</button></Link>
                </div>
            )}
        </header>
    )
}