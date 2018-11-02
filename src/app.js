var express = require('express'),
    url = require("url"),  
    path = require("path"),  
    fs = require("fs");

var port = process.env.PORT || 3000;

var app = express();


// use views from view folder and use ejs
//app.use(express.static('public'));
console.log("__dirname " + __dirname);
console.log("process.cwd " + process.cwd());

app.set("views", path.resolve(__dirname, "views"));
app.set('view engine', 'ejs');


var route = require('./controllers/route');
route(app)


app.listen(process.env.PORT)