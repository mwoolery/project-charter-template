// app.js set up, all the required modules
var express = require('express'),
    url = require("url"),  
    path = require("path"),  
    fs = require("fs");
var mongoose = require("mongoose"),
    passport = require("passport"),
    User = require("./models/user"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

const bodyParser = require("body-parser")
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
var app = express();

//select a config file for mailgun and database info, connect to mailgun, give the app a port, and connect to the database
var port = process.env.PORT || 3000;
const mgconfig = (process.env.NODE_ENV === "production") ? {} : require('./config.json') 
const api_key = process.env.MAILGUN_API_KEY || mgconfig.MAILGUN_API_KEY
const DOMAIN = process.env.MAILGUN_DOMAIN || mgconfig.MAILGUN_DOMAIN
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: DOMAIN })
const dbconnection = process.env.MONGO_CONNECTION || mgconfig.MONGO_CONNECTION
mongoose.connect(dbconnection);


// database is connected with options
var uri = dbconnection
mongoose.Promise = global.Promise;
var promise = mongoose.connect(uri, {autoIndex:true, autoReconnect:true})
promise.then(function (db) {
  // initialize data ............................................
  require('./utils/seeder.js')(app)  // load seed data
})
// handle the database connection
mongoose.connection.once('open', function () {
 
  console.log("Connected to mongo server.");
  mongoose.connection.on('connected', function () {
    console.log("Connected .");
  })

  mongoose.connection.on('disconnected', function () {
    console.log("disconnect.");
  })

  mongoose.connection.on('reconnected', function () {
    console.log("reconnect.");
  })

  mongoose.connection.on('error', function (err) {
    console.log("ERREEOREOROOEROROR.");
    process.exit(1)
  })
  
})


// make the app use the express layouts given
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }))

// express session that gives a cookie when logged in to the banneritem editor, cookie info is saved in the database
app.use(require("express-session")({
  secret:"Rusty is the best og in the world",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    url: dbconnection,
    autoReconnect: true
  })
}));
app.use(bodyParser.json())

// set the app views
app.set("views", path.resolve(__dirname, "views"));
app.set('view engine', 'ejs');


// use the banneritem controller to handle app views
app.use('/banneritem', require('./controllers/banneritem.js'));

// use passport for authetication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// use assets from the public folder, this includes scripts, css, images, etc.
app.use(express.static(__dirname + '/public/'));

// use the route controller for the main part of the app
var route = require('./controllers/route');
route(app)

// redirect to the login
app.post("/login", passport.authenticate("local",{
    successRedirect:"/banneritem",
    failureRedirect:"/login"
  }),function(req, res){
    //res.send("User is "+ req.user.id);
});

// logout function called when the user logouts of the passport session
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });

  app.get('*', function(req, res){
    res.render('error',
    { title: "error", layout: "error.ejs" });

  });

// contact form post to be handled
app.post("/contact", function (req, res) {
    const name = req.body.inputname;
    const email = req.body.inputemail;
    const reason = req.body.inputreason;
    const company = req.body.inputcompany;
    const comment = req.body.inputcomment;
    const phone = req.body.inputphone;
    const start = req.body.inputstart;
    const end = req.body.inputend;
  
    // build the email body
    const str ='\nContact Form Entry from: ' + name + 
               '\nContact Phone Number: ' + phone + 
               '\nContact Email: ' + email + 
               '\nReason for Contact: '+ reason + 
               '\nReservation Start: '+ start + 
               '\nReservation End: '+ end + 
               '\nCompany:' + company + 
               '\nComment: ' + comment + 
               '\n';
   
  
    // change email to bbyland@nwmissouri.edu when implemented        
    //mail options for mailgun   
    const mailOptions = {
      from: 'Hughes FieldHouse Contact Form <postmaster@sandboxc3954874d6c14d68a692fc29a2900ae9.mailgun.org>', // sender address
      to: 'mwoolery@nwmissouri.edu', // list of receivers
      subject: 'Message from Resume Website Contact page', // Subject line
      text: str
      

    }
  
    console.log(mailOptions.text);
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



  // app listening on port
app.listen(port)
console.log("you are listening to port 3000")
module.exports = app
