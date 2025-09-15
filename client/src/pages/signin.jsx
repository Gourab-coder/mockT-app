import React from "react";
import "./signin.css"

let Signin = () => {
    return (
        <>
            <div className="container">
                <div className="card">
                    <h1 className="logo">mockT</h1>
                    <div className="smiley">😊</div>
                    <h2 className="title">SIGN IN</h2>

                    <form>
                    <input type="text" placeholder="name" />
                    <input type="text" placeholder="phone" />

                    <div className="verify">
                        <button type="submit">verify number</button>
                        <input type="text" placeholder="" />
                    </div>

                    <input type="password" placeholder="password" />
                    <input type="password" placeholder="conform password" />

                    <button type="submit">submit</button>
                    </form>
                </div>

                <div className="footer">
                    <a href="#about">ABOUT US</a>
                    <a href="#contact">CONTACT US</a>
                </div>
            </div>
        </>
    )
}

export default Signin;