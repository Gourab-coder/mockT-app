import React from "react";
import "./Home.css";
import Header from "../components/header";
import MockTests from "../components/mocktest";
import Dashboard from "../components/dashboard";
import Footer from "../components/footer";

export default function Home () {

    return (
        <>
            <div className="login-home">
                <Header/>
                <div className="main-section">
                  <MockTests/>
                  <Dashboard/>
                </div>
                <Footer/>
            </div>
        </>
    )
}