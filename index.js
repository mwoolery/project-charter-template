//export used
var express = require('express'),
    url = require("url"),  
    path = require("path"),  
    fs = require("fs");

const _port = 3000

var app = express();



app.use(express.static(path.join(__dirname, '/..', './src')));

app.get('/', function(req, res){
    res.sendFile('./src/index.html',{root: __dirname});
})

app.listen(_port, function() { console.log('listening port '+_port+"\n__dirname : "+__dirname)});