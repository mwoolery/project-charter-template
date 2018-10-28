//export used
var express = require('express'),
    url = require("url"),  
    path = require("path"),  
    fs = require("fs");

const _port = 3000

var app = express();
curl -s --user 'api:4836d8f5-93b1e7a3' \
    https://api.mailgun.net/v3/sandboxa16b182489814caba2256e4c4d40ecda.mailgun.org/messages \
        -F from='Mailgun Sandbox <postmaster@sandboxa16b182489814caba2256e4c4d40ecda.mailgun.org>' \
        -F to='sairam <s531508@nwmissouri.edu>' \
        -F subject='Hello sairam' \
        -F text='Congratulations sairam, you just sent an email with Mailgun!  You are truly awesome!'

app.use(express.static(path.join(__dirname, '/..', './src')));

app.get('/', function(req, res){
    res.sendFile('./src/index.html',{root: __dirname});
})

app.listen(_port, function() { console.log('listening port '+_port+"\n__dirname : "+__dirname)});