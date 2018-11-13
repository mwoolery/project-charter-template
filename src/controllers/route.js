var express = require('express');
var api = express.Router();
var find = require('lodash.find');
var remove = require('lodash.remove');
var findIndex = require('lodash.findindex');
var Model = require('../models/bannerItem.js');
const notfoundstring = 'No such aggregate material';

module.exports = function(app){
    app.get('/', function(req, res){
       res.render('index');
      
    var data = req.app.locals.BannerItem.query;
    res.send(JSON.stringify(data));
    });

    app.get('/login', function (req, res) {
        res.render('login')
    })

    app.get('/awards', function (req, res) {
        res.render('awards')
    })

    app.get('/contact', function (req, res) {
        res.render('contact')
    })

    app.get('/events', function (req, res) {
        res.render('events')
    })

    app.get('/locker', function (req, res) {
        res.render('locker')
    })

    app.get('/meetingRooms', function (req, res) {
        res.render('meetingRooms')
    })

    app.get('/offline', function (req, res) {
        res.render('offline')
    })

    app.get("/secret",isLoggedIn, function(req, res){
        res.render("secret");
    });

};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
    return next();
    }
    res.redirect("/login");
}