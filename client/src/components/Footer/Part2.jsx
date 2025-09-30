import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'; // Make sure you have react-icons installed

export default function Part2() {
    return (
        <div id="footer-bottom">
            <p id="rights">© 2025 mockT. All rights reserved.</p>
            <div id="social-icons">
                <FaInstagram />
                <FaTwitter />
                <FaLinkedin />
            </div>
        </div>
    )
}