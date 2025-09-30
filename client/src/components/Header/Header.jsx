import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header_home () {
    return (
        <div>
            <header id="header1">
                <div id="head1">
                    <h1 id="name">mockT</h1>
                    <Link id="link" to="/courses">courses</Link>
                </div>
                <div id="head2">
                    <Link to="/login">
                        <button id="head-btn1">Login</button>
                    </Link>
                    <Link to="/signup">
                        <button id="head-btn2">Signup</button>
                    </Link>
                </div>
            </header>
        </div>
    )
}