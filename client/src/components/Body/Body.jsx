import React from "react";
import "./Body.css"
import img1 from "./img1.png";

export default function Body_home() {
  return (
    <div>
        <div id="text-dev">
            <div id="text1">
                <p> Empower Your <br /> Learning Journey <br /> with <h1>mockT</h1></p>
            </div>
            <p id="text2">
              Unlock a world of knowledge and skills with our innovative online courses, expert instructors, and interactive learning tools. and skills with our innovative online courses, expert instructors, and interactive learning tools.
            </p>
            <button id="text-btn">Explore Features</button>
        </div>
        <img src={img1} alt="image" id="body-img"/>
    </div>
  );
}
