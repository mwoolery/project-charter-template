// user model used for passport login

// require mongoose and mongoose local strategy for Passport Models
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


// User Schema, username and password fields
var UserSchema = new mongoose.Schema({
    username:String,
    password:String
});

// use the passport plugin for mongoose models
UserSchema.plugin(passportLocalMongoose);

//export for app.js use
module.exports = mongoose.model("User",UserSchema);

