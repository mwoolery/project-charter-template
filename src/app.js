var express = require('express'),
    url = require("url"),  
    path = require("path"),  
    fs = require("fs");

const _port = 3000

var app = express();


// use views from view folder and use ejs
//app.use(express.static('public'));
app.set("views", path.resolve(__dirname, "views"));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('views/index');
});

var route = require('./controllers/route');
route(app)


app.listen(process.env.port)