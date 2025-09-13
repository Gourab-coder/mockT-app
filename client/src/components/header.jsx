import React from "react";
import './header.css'

let Header = () => {

    return (
        <>
            <header className="header">
            {/* Logo */}
            <h1 className="logo">mockT</h1>

            {/* Search Bar */}
            <div className="search-container">
                <input type="text" placeholder="Search......" className="search-input" />
            </div>

            {/* Right Side */}
            <div className="auth-section">
                <span className="smiley">😊</span>
                <a href="#" className="auth-link">Log In</a>
                <p>/</p>
                <a href="#" className="auth-link">Sign In</a>
            </div>
            </header>
        </>
    )
}

export default Header;