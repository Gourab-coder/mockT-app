import React from "react";
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import "./Profile.css";
import Desk from "../../components/Card/Desk";
import Footer from "../../components/Footer/Footer";


export default function Profile() {

    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        profilePhoto: "" // Set to image URL if present, else empty string
    };
  return (
    <div>
        <header id="header-profile">
            <div id="head1">
                <h1 id="name">mockT</h1>
                <p>profile</p>
            </div>
            <div>
                <AccountCircleTwoToneIcon style={{fontSize: "40px", color: "#c4bcbc"}}/>
            </div>
        </header>
        <div id="profile">
            <div className="profile-card">
                {user.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt="Profile"
                    className="profile-avatar-img"
                  />
                ) : (
                  <AccountCircleTwoToneIcon className="profile-avatar" style={{fontSize: "70px", color: "#c4bcbc"}}/>
                )}
                <div className="profile-info">
                    <div className="profile-name">{user.name}</div>
                    <div className="profile-email">{user.email}</div>
                </div>
            </div>
        </div>
        <div className="dashboard-desk-wrapper">
            <Desk />
        </div>
        <div id="created-mocktests">
            <h1>YOUR CREATED MOCK TESTS</h1>
            <div id="mocktest-list">
                {/* List of created mock tests will go here */}
                <div>No mock tests created yet.</div>
                <button id="create-mocktest-btn">Create Mock Test</button>
            </div>
        </div>
        <div className="dashboard-footer-wrapper">
            <Footer/>
        </div>
    </div>
  )
}