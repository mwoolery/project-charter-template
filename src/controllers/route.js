/*
    get the main routes of the hughes fieldhouse app
    includes gets for /login , /awards , /contact , /events , /lockers , /meetingRooms , and / for index
    other pages on the site link to the current hughes fieldhouse site on Northwest as the client wanted.
*/
var express = require('express');
var api = express.Router();
var find = require('lodash.find');
var remove = require('lodash.remove');
var findIndex = require('lodash.findindex');
//var Model = require('../models/bannerItem.js');
const notfoundstring = 'No such aggregate material';

// export the main routing of the application
module.exports = function(app){

    // render the login page when /login is put in the url
    app.get('/login', function (req, res) {
        res.render('login')
    })
    // render the awards page when /awards is put in the url
    app.get('/awards', function (req, res) {
        res.render('awards')
    })
    // render the contact page when /contact is put in the url
    app.get('/contact', function (req, res) {
        res.render('contact')
    })
    // render the events page when /events is put in the url
    app.get('/events', function (req, res) {
        res.render('events')
    })
    // render the locker page when /locker is put in the url
    app.get('/locker', function (req, res) {
        res.render('locker')
    })
     // render the meetingRooms page when /meetingRooms is put in the url
    app.get('/meetingRooms', function (req, res) {
        res.render('meetingRooms')
    })

    // render the site index page when / or nothing is in the url
    app.get('/', function(req, res){
        res.render('index');
       
     });
     
    
};

