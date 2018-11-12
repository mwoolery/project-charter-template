var express = require('express'),
    url = require("url"),  
    path = require("path"),  
    fs = require("fs");
var mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

var port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/database");
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
  secret:"Rusty is the best og in the world",
  resave: false,
  saveUninitialized: false
}));

app.set("views", path.resolve(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public/'));

app.use(passport.initialize());
app.use(passport.session());
// 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var route = require('./controllers/route');
route(app)

// middleware
app.post("/login", passport.authenticate("local",{
    successRedirect:"/secret",
    failureRedirect:"/login"
  }),function(req, res){
    res.send("User is "+ req.user.id);
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//     return next();
//     }
//     res.redirect("/login");
// }

app.listen(port)
console.log("you are listening to port 3000")