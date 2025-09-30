let express = require("express");
let mongoose = require("mongoose");
require("dotenv").config();
let connectDB = require("./App/config/db");
let app = express();
app.use(express.json());

app.get("/home", (req, res)=>{
    res.send("hello world");
});

app.listen(process.env.PORT || 5001, ()=>{
    console.log("port is connected..");
});  // http://localhost:1001/home