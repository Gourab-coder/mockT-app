import React from "react";
import Header_home from "../../components/Header/Header";
import "./about.css"; // We'll create this file for styling
import Footer from "../../components/Footer/Footer";
import Desk from "../../components/Card/Desk";
import imgLogo from "./img-logo.png";

export default function About () {
    return (
        <div className="about-page">
            <Header_home/>
            <div className="about-content">
                <div id="text-part">
                    <h1>About mockT</h1>
                    <p>Welcome to mockT, your all-in-one solution for creating and taking mock tests.</p>
                    <p>Our platform is designed to help students and educators streamline the testing process with flexible tools and an interactive community.</p>
                </div>
                <div id="img-part">
                    <img src={imgLogo} alt="mockT platform illustration" />
                </div>
            </div>
            <Desk/>
            <Footer/>
        </div>
    )
}