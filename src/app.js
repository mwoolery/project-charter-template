var express = require('express'),
    url = require("url"),  
    path = require("path"),  
    fs = require("fs");

var port = process.env.PORT || 3000;


//Database set up in code block below
//const Datastore = require('nedb');
//var db = new Datastore();
//db.loadDatabase();



var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public/'));


//set up seed data
//var bannerItems = require('./data/banneritem.json');
//db.insert(bannerItems);
//app.locals.bannerItems = db.find(bannerItems);
//console.log(Object.keys(bannerItems).length+ " bannerItems");
//app.use('/banneritem', require('./controllers/banneritem.js'));


var route = require('./controllers/route');
route(app)




app.listen(port)
console.log("you are listening to port 3000")