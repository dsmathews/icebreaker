const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ConnectionSchema = new Schema({
    makerId:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    takerId:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    score:{
            //grabs score result from page         
        }
});

const Connection = mongoose.model("Connection", ConnectionSchema);

module.exports = Connection;