import React from "react";
import Header_home from "../components/Header/Header";
import Body_home from "../components/Body/Body";
import "./Home.css"
import Desk from "../components/Card/Desk";
import Card from "../components/Card/Card";

export default function Home () {
    return (
        <div id="homepage">
            <Header_home/>
            <Body_home />
            <Desk/>
            <Card/>
        </div>
    )
}