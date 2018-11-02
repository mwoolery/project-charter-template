const express = require('express')

var express = require('express'),
    url = require("url"),  
    path = require("path"),  
    fs = require("fs");

const _port = 3000

var app = express();



app.use(express.static('public'));
app.set('view engine', 'ejs');

var route = require('./controllers/route');
route(app)



app.listen(process.env.port, () => console.log(`Example app listening on port ${port}!`))