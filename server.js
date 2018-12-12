const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
require('./routes/api-routes')(app);
require('./models/Connection');
require('./models/Quiz');
require('./models/User');
const databaseUri = 'mongodb://localhost/icebreaker';
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
} else {
    mongoose.connect(databaseUri, {useNewUrlParser: true});
}
const db = mongoose.connection;
db.on('error', function (err){
    console.log("Mongoose Error: ", err);
});
db.once('open', function () {
    console.log("Mongoose connection successful.");
});
app.get('/', (req,res) => {
  res.send(process.env.SECRET_KEY);
})
// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});