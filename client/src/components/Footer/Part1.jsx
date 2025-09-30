import React from "react";

export default function Part1(){
    return (
        <div id="footer-top">
            <div id="subscribe-section">
                <div id="logo-subscribe">
                    <h1 id="name1">mockT</h1>
                    <p id="text1">Subscribe for the latest courses, tips, and updates. Join our learning community today!</p>
                </div>
                <form action="mail" id="form">
                    <input type="text" placeholder="Enter your email" id="form-input" />
                    <button id="form-btn" type="submit">Subscribe</button>
                </form>
            </div>
            <div id="links-section">
                <div id="buss">
                    <h3 id="name2">mockT Bussiness</h3>
                    <a href="#" id="link1">Teach on mockT</a>
                    <a href="#" id="link2">Teaching Tools</a>
                    <a href="#" id="link3">mockT app</a>
                    <a href="#" id="link4">Contact us</a>
                </div>
                <div id="career">
                    <h3 id="name3">Careers</h3>
                    <a href="#" id="link5">Blog</a>
                    <a href="#" id="link6">Affiliate</a>
                    <a href="#" id="link7">Support</a>
                </div>
            </div>
        </div>
    )
}