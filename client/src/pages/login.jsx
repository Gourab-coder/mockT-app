import React from "react";
import "./login.css"

let Login = () => {

    return (
        <>
            <div className="login-container">
                <h1 className="logo">mockT</h1>
                <div className="smiley">😊</div>
                <h2 className="login-title">LOGIN</h2>

                <form className="login-form">
                    <input
                    type="text"
                    placeholder="mockT ID / email Id / phone"
                    required
                    />
                    <input type="password" placeholder="password" required />
                    <button type="submit">submit</button>
                </form>

                <footer>
                    <a href="#">ABOUT US</a>
                    <a href="#">CONTACT US</a>
                </footer>
            </div>
        </>
    )
}

export default Login;