const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var QuizSchema = new Schema({
    
    title: {
        type: String,
        trim: true,
        required: "Title is Required"
    },
    questions: {
        type: Array,
        trim: true,
        required: "Question is Required"
    },
    answers:{
            type: Array
        },
    quizMaker: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    takers: {
        type: Array
    }
});

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;