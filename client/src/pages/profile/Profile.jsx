import React from "react";
import Header_home from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";
import "./Profile.css"

export default function Profile () {

    let user = {
        name: localStorage.getItem('name') || "",
        email: localStorage.getItem('email') || "",
        token: localStorage.getItem('token') || ""
    };

    return (
        <div id="profile-page">
            <div id="header-wrapper">
                <Header_home/>
            </div>
            <div id="details">
                <h2>Name: {user.name}</h2>
                <h3>Email: {user.email}</h3>
            </div>
            <div id="about">
                <div>
                    <p>vcauktb wvdcyua lIGREUCGFR3F4UJIGRGRGRFGG,fdugvmncx mncxmcx</p>
                </div>
                <div>

                </div>
            </div>
            <div id="score-section">
                <div>
                    <div> name - test name - score</div>
                </div>
            </div>
            <div id="card-wrapper">
                <Card/>
            </div>
            <div id="footer-wrapper">
                <Footer/>
            </div>
        </div>
    )
}