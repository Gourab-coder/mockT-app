import React from "react";
import './header.css'

export default function Header () {
    return (
        <div className="header">
            <h1 className="logo">mockT</h1>
            <input className="search" type="text" placeholder="Search......" />
            <div className="profile">
                <div className="smiley">😊</div>
                <p className="username">Gourab2k25</p>
            </div>
        </div>
    )
}