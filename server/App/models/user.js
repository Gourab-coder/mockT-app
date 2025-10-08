const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // basic email pattern
        unique: true // Each user should have a unique email
    },
    password: { // You should store a hashed password, not plain text
        type: String,
        required: true
    },
    createdTests: [{ // An array of references to the tests created by the user
        type: Schema.Types.ObjectId,
        ref: 'mockT-enquiry' // This must match the model name in enquiry.js
    }]
});

const userModel = mongoose.model("mockT-user", userSchema);
module.exports = userModel;
