// controller for /banneritem model and views
/**
 * Controller methods for the banneritem editor, this is accessed after logged as admin
 * should check that the user is logged in
 * functions include, get methods for json data listed as /findall , /findone/:id
 * get the index of the banner item editor with /
 * handle the views of Crud functions with /create, /edit/:id , details/:id , delete/:id
 * handle the database functions with /save , /save/:id , and delete/:id
 */

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

  // function that checks that user is logged in to passport session. Goes to next page aka banneritem/index if succesfull and back to login if unsuccessfull
  function isLoggedIn(req, res, next){
    if(req.session.passport && req.session.passport.user){
       return next();
    }
    res.redirect("/login");
  }


// HANDLE JSON REQUESTS --------------------------------------------

// Find all items in the database, used to test that server is getting all json responses
api.get('/findall', function(req, res){
    //res.setHeader('Content-Type', 'application/json');
    Model.find({}, function(err, items) {
        var data = [];
    
        items.forEach(function(banneritem) {
            data.push(banneritem);
        });
    
        res.send(data);  
      })
    
    
   
    
});

// Find one id, for a given id return the json data for that id
api.get('/findone/:id', function(req, res){
     res.setHeader('Content-Type', 'application/json');
    var id = parseInt(req.params.id);
    var data = req.app.locals.BannerItem.query;
    var item = Model.find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    res.send(JSON.stringify(item));
});

// banneritem/index page,  this is allows any routes in banner item to return to the index page by providing "/" to the href
api.get('/',isLoggedIn, function(req, res) {
    console.log("Handling GET " + req);
    return res.render('banneritem/index.ejs',
        { title: "Banner Items", layout: "bannerlayout.ejs" });
});

// GET create, returns the create page where the user will create a new banner item
api.get("/create",isLoggedIn, function(req, res) {
    console.log('Handling GET /create' + req);
    res.render("banneritem/create.ejs",
        { title: "Banner Item", layout: "bannerlayout.ejs" });
});

// GET /delete/:id , returns the delete page for the given id so that the user can see the data and be sure they want to delete
api.get('/delete/:id',isLoggedIn, function(req, res) {
    console.log("Handling GET /delete/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.BannerItem.query;
    //var item = find(data, { '_id': id });
    Model.findOne({_id: id}, function(err, item) {
        var data = item;
    
        
        
        //res.send(data);  
        res.render('banneritem/delete.ejs',
        {
            title: "Banner Item",
            layout: "bannerlayout.ejs",
            BannerItem: data
        });
      })
});

// GET /details/:id , Gets the detail page so the user can read the data, no data modification done
api.get('/details/:id',isLoggedIn, function(req, res) {
    console.log("Handling GET /details/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.BannerItem.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('banneritem/details.ejs',
        {
            title: "Banner Item",
            layout: "bannerlayout.ejs",
            BannerItem: item
        });
});

// Get /edit/:id , gets the edit page so the user can modify the selected banneritem 
api.get('/edit/:id',isLoggedIn, function(req, res) {
    console.log("Handling GET /edit/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.BannerItem.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('banneritem/edit.ejs',
        {
            title: "Banner Item",
            layout: "bannerlayout.ejs",
            BannerItem: item
        });
});




// POST new  , saves a new item to the database. Gets user input from the requested page and puts data into each field for a creation of a banneritem
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
    var temp = "true";
    if(!req.body.priority || req.body.priority == null || req.body.priority == undefined){
        temp = false;
    }
    item.priority = temp;
    item.link = req.body.link;
    data.push(item);
    Model.create({
       _id:  item._id,
      description: item.description,
      startDate: item.startDate,
      endDate: item.endDate,
      startTime: item.startTime,
      endTime: item.endTime,
      priority : item.priority,
      link: item.link
    });
    return res.redirect('/banneritem');
});


//handles the edit of the page, for a given id save it to the database. Mongodb will save it at the selected id

api.post('/save/:id', function(req, res) {
    
    var id = parseInt(req.params.id);
   
    var data = req.app.locals.BannerItem.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
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
    Model.findById(req.params.id, function(err, p) {
        if (!p)
          return next(new Error('Could not load Document'));
        else {
          // do your updates here
          p.description = item.description;
          p.startDate = item.startDate;
          p.endDate = item.endDate;
          p.startTime = item.startTime;
          p.endTime = item.endTime;
          p.priority = item.priority;
          p.link = item.link;
      
      
          p.save(function(err) {
            if (err)
              console.log('error')
            else
              console.log('successfull update')
          });
        }
      });
     
   
    return res.redirect('/banneritem');
});

// for a given id, remove it from the database
api.post('/delete/:id', function(req, res, next) {
    console.log("Handling DELETE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling REMOVING ID=" + id);
    var data = req.app.locals.BannerItem.query;
    var item = remove(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("Deleted item " + JSON.stringify(item));
    Model.remove({ _id: id }, function(err) {
        if (!err) {
               console.log("successfull delete");
        }
        else {
               console.log("error");
        }
    });
    return res.redirect('/banneritem');
});

  
// export this so app.js can use it.
module.exports = api;
