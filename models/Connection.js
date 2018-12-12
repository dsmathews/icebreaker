const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ConnectionSchema = new Schema({
    quizId: {
        type: Schema.Types.ObjectId,
        ref: "Quiz"
    },
    makerId:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    takerId:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    score:{
            type: Number
        }
});

const Connection = mongoose.model("Connection", ConnectionSchema);

module.exports = Connection;