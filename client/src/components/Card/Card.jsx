import React from "react";
import "./Card.css";
import img2 from "./img2.png"
import logo1 from "./logo1.png"
import logo2 from "./logo2.png"
import logo3 from "./logo3.png"

export default function Card () {
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
                    <button id="file-btn">Join Now</button>
                </div>
            </div>
        </div>
    )
}