import React from "react";
import "./Card.css";
import img2 from "./img2.png"

export default function Card () {
    const handleJoinClick = () => {
        window.open("https://chat.whatsapp.com/EcuFGIcQ1eZAK5Pc0eVLSu", "_blank", "noopener,noreferrer");
    };

    return (
        <div>
            <div id="card1">
                <div id="img">
                    <img src={img2} alt="image" id="card-img"/>
                </div>
                <div id="file">
                    <h1 id="line1">All-In-One Solution</h1>
                    <p id="line2">Flexible Learning</p>
                    <p id="line3">Expert Instructors</p>
                    <p id="line4">Interactive Community</p>
                    <button id="file-btn" onClick={handleJoinClick}>Join Now</button>
                </div>
            </div>
        </div>
    )
}