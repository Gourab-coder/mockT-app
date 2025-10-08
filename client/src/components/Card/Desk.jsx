import React from "react";
import { useNavigate } from "react-router-dom";
import "./Desk.css"

export default function Desk () {
    const navigate = useNavigate();

    const handleExploreClick = () => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/mock-dash');
        } else {
            alert('Please log in to explore this feature.');
            navigate('/login');
        }
    };

    return (
        <div>
            <div id="desk1">
                <div id="mock">
                    <h2 id="title1">Mock Test</h2>
                    <button className="desk-btn" onClick={handleExploreClick}>Explore</button>
                </div>
                <div id="talk">
                    <h2 id="title2">Coding</h2>
                    <button className="desk-btn" onClick={() => alert('Feature coming soon!')}>Explore</button>
                </div>
                <div id="code">
                    <h2 id="title3">AI Mock Test</h2>
                    <button className="desk-btn" onClick={() => alert('Feature coming soon!')}>Explore</button>
                </div>
            </div>
        </div>
    )
}