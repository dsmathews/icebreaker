const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

var UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is Required"
  },
  password: {
    type: String,
    trim: true,
    unique: true,
    required: "Password is Required",
    match: [
      /^[a-z0-9_-]+$/i,
            'Username can only contain letters, numbers, _, and -'
    ]
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: "Email is Required",
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Invalid email'
    ]
  },
   firstName: {
     type: String,
     trim: true,
     match: [
      /^[a-z'-]+$/i,
      'Name can only include letters, \', and -'
    ]

    },
    lastName: {
      type: String,
      trim: true,
      match: [
          /^[a-z'-]+$/i,
          'Name can only include letters, \', and -'
      ]
  
  },
  quizId: {
    type: String
  }
});

UserSchema.plugin(uniqueValidator);
UserSchema.pre(`save`, function(next) {
  var user = this;
  //if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10)
  .then(function(hashed) {
      user.password = hashed;
      next();        
  })
  .catch(function(err) {
      console.log(err);
  });
});
UserSchema.methods.validatePw = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const User = mongoose.model("User", UserSchema);

module.exports = User;