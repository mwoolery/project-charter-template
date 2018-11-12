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

const bodyParser = require("body-parser")
const expressLayouts = require('express-ejs-layouts');
var port = process.env.PORT || 3000;
const mgconfig = (process.env.NODE_ENV === "production") ? {} : require('./config.json') 
const api_key = process.env.MAILGUN_API_KEY || mgconfig.MAILGUN_API_KEY
const DOMAIN = process.env.MAILGUN_DOMAIN || mgconfig.MAILGUN_DOMAIN
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: DOMAIN })

console.log(api_key);
console.log(DOMAIN);
//Database set up in code block below
const Datastore = require('nedb');
var db = new Datastore();
db.loadDatabase();



mongoose.connect("mongodb://localhost:27017/database");
var app = express();


app.set("views", path.resolve(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public/'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//set up seed data
var BannerItem = require('./data/banneritem.json');
db.insert(BannerItem);
app.locals.BannerItem = db.find(BannerItem);
console.log(Object.keys(BannerItem).length+ " BannerItem");
console.log(BannerItem);
app.use('/banneritem', require('./controllers/banneritem.js'));

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

// 5 http POST /contact
app.post("/contact", function (req, res) {
    const name = req.body.inputname;
    const email = req.body.inputemail;
    const reason = req.body.inputreason;
    const company = req.body.inputcompany;
    const comment = req.body.inputcomment;
    // const name = "Matt Woolery";
    // const email = "woolerymatt@yahoo.com";
    // const company = "nwmsu";
    // const comment = "testing";
  
    // logs to the terminal window (not the browser)
    const str ='\nContact Form Entry from: ' + name + '\n Contact Email: ' + email + '\n Reason for Contact: '+ reason + '\n Company:' + company + '\n Comment: ' + comment + '\n'
    console.log(str)
  
    const mailOptions = {
      from: 'Excited User <woolerymatt03@gmail.com>', // sender address
      to: 'woolerymatt03@gmail.com, mwoolery@nwmissouri.edu', // list of receivers
      subject: 'Message from Resume Website Contact page', // Subject line
      text: str
    }
  
    // send message via MailGun's API
    mailgun.messages().send(mailOptions, function (error, body) {
      if (error) {
        console.log('\nERROR: ' + error + '\n');
        res.json({ msg: 'error sending message' })
      } else {
        console.log('Sending email...')
        console.log(body);
        res.render('contact-confirm.ejs')
      }
    })
  })



app.listen(port)
console.log("you are listening to port 3000")