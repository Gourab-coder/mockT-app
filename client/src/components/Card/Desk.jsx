import React from "react";
import "./Desk.css"

export default function Desk () {
    return (
        <div>
            <div id="desk1">
                <div id="mock">
                    <h2 id="title1">Job interview</h2>
                    <button id="mock-btn">View More</button>
                </div>
                <div id="talk">
                    <h2 id="title2">Comminucation</h2>
                    <button id="talk-btn">View More</button>
                </div>
                <div id="code">
                    <h2 id="title3">Coding</h2>
                    <button id="code-btn">View More</button>
                </div>
            </div>
        </div>
    )
}