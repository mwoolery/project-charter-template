var express = require('express'),
    url = require("url"),  
    path = require("path"),  
    fs = require("fs");

var port = process.env.PORT || 3000;

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public/'));


var route = require('./controllers/route');
route(app)


app.listen(port)
console.log("you are listening to port 3000")