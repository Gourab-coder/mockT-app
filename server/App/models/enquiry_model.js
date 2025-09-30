let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userEnquireSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // basic email pattern
        lowercase: true,
        trim: true
    },
    password:{
        type:String,
        require:true,
        minlength:8
    }
});

module.exports = mongoose.model("mockT-User", userEnquireSchema);

