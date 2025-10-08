import React from "react";
import "./Body.css"
import img1 from "./img1.png";

export default function Body_home() {
  return (
    <div>
        <div id="text-dev">
            <div id="text1">
                <h1> Empower Your <br /> Learning Journey <br /> with <span>mockT</span></h1>
            </div>
            <p id="text2">
              Unlock a world of knowledge and skills with our innovative online courses, expert instructors, and interactive learning tools. and skills with our innovative online courses, expert instructors, and interactive learning tools.
            </p>
            <button id="text-btn">Explore Features</button>
        </div>
        <div id="body-img-div">
          <img src={img1} alt="image" id="body-img"/>
        </div>
    </div>
  );
}
