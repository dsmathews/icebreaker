const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var QuizSchema = new Schema({
    questions: {
        type: String,
        trim: true,
        required: "Question is Required"
    },
    answers:{
            type: Boolean
        },
    quizMaker: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
});

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;