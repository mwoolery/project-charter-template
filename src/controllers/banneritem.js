var express = require('express');
var api = express.Router();
var find = require('lodash.find');
var remove = require('lodash.remove');
var findIndex = require('lodash.findindex');
var Model = require('../models/bannerItem.js');
const notfoundstring = 'No such aggregate material';
LocalStrategy = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
 mongoose = require("mongoose"),
  passport = require("passport");

  function isLoggedIn(req, res, next){
    if(req.session.passport && req.session.passport.user){
       return next();
    }
    res.redirect("/login");
  }

// See app.js to find default view folder (e.g.,"views")
// see app.js to find  default URI for this controller (e.g., "aggregateMaterial")
// Specify the handler for each required combination of URI and HTTP verb 
// HTML5 forms can only have GET and POST methods (use POST for DELETE)

// HANDLE JSON REQUESTS --------------------------------------------


api.get('/findall', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    var data = req.app.locals.BannerItem.query;
    res.send(JSON.stringify(data));
});

api.get('/findone/:id', function(req, res){
     res.setHeader('Content-Type', 'application/json');
    var id = parseInt(req.params.id);
    var data = req.app.locals.BannerItem.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    res.send(JSON.stringify(item));
});

api.get('/',isLoggedIn, function(req, res) {
    console.log("Handling GET " + req);
    return res.render('banneritem/index.ejs',
        { title: "Banner Items", layout: "bannerlayout.ejs" });
});

// GET create
api.get("/create",isLoggedIn, function(req, res) {
    console.log('Handling GET /create' + req);
    res.render("banneritem/create.ejs",
        { title: "Banner Items", layout: "bannerlayout.ejs" });
});

// GET /delete/:id
api.get('/delete/:id',isLoggedIn, function(req, res) {
    console.log("Handling GET /delete/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.BannerItem.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('banneritem/delete.ejs',
        {
            title: "Banner Items",
            layout: "bannerlayout.ejs",
            BannerItem: item
        });
});

// GET /details/:id
api.get('/details/:id',isLoggedIn, function(req, res) {
    console.log("Handling GET /details/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.BannerItem.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('banneritem/details.ejs',
        {
            title: "Banner Items",
            layout: "bannerlayout.ejs",
            BannerItem: item
        });
});

// GET one
api.get('/edit/:id',isLoggedIn, function(req, res) {
    console.log("Handling GET /edit/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.BannerItem.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('banneritem/edit.ejs',
        {
            title: "Banner Items",
            layout: "bannerlayout.ejs",
            BannerItem: item
        });
});


// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
/**
 * adding a new item
 */

// POST new
api.post('/save', function(req, res) {
    console.log("Handling POST " + req);
    var data = req.app.locals.BannerItem.query;
    var item =  new Model;
    console.log("NEW ID " + req.body._id);
    item._id = parseInt(req.body._id);
    item.description = req.body.description;
    item.startDate = req.body.startDate;
    item.endDate = req.body.endDate;
    item.startTime = req.body.startTime;
    item.endTime = req.body.endTime;
    //item.priority = req.body.priority;
    var isPriority = req.body.priority;
    if(isPriority=="on"){
        isPriority = true;
    }else{
        isPriority =false;
    }
    item.priority = isPriority;
    item.link = req.body.link;
    data.push(item);
    console.log("SAVING NEW ITEM " + JSON.stringify(item));
    return res.redirect('/banneritem');
});


//update

api.post('/save/:id', function(req, res) {
    console.log("Handling SAVE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling SAVING ID=" + id);
    var data = req.app.locals.BannerItem.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("ORIGINAL VALUES " + JSON.stringify(item));
    console.log("UPDATED VALUES: " + JSON.stringify(req.body));
    item.description = req.body.description;
    item.startDate = req.body.startDate;
    item.endDate = req.body.endDate;
    item.startTime = req.body.startTime;
    item.endTime = req.body.endTime;
    //item.priority = req.body.priority;
   
    var isPriority = req.body.priority;
    if(isPriority=="on"){
        isPriority = true;
    }else{
        isPriority =false;
    }
    item.priority = isPriority;
    
    item.link = req.body.link;
    console.log("SAVING UPDATED ITEM " + JSON.stringify(item));
    return res.redirect('/banneritem');
});

//delete
api.post('/delete/:id', function(req, res, next) {
    console.log("Handling DELETE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling REMOVING ID=" + id);
    var data = req.app.locals.BannerItem.query;
    var item = remove(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("Deleted item " + JSON.stringify(item));
    return res.redirect('/banneritem');
});

  
  
module.exports = api;
