let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let enquirySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true  
    },
    timeLimit:{
        type: Number,
        required: true
    },
    numberOfQuestions:{
        type: Number,
        required: true
    },
    questions:{
        type: Array,
        required: true
    },
    testId:{
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'mockT-user',
        required: true
    },
    scores: [{
        studentName: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        submittedAt: {
            type: Date,
            default: Date.now
        }
    }]
});

const enquiryModel = mongoose.model("mockT-enquiry", enquirySchema);
module.exports = enquiryModel;
