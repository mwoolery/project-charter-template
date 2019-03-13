// Seeder for initial in app database set up, required so that the database is set up in app so it will be able to communicate to mongoose as well
const Datastore = require('nedb')
const BannerItem = require('../data/banneritem.json')
const Model = require("../models/bannerItem.js");

//export so app.js can use it
module.exports = (app) => {
 
  // in app database initialization
  const db = {}

  db.BannerItem = new Datastore()
 

  db.BannerItem.loadDatabase()
 
 // gets items stored currently in atlas so the banner editor can be used with current data.
  Model.find({}, function(err, items) {
    var data = [];
    
    // add each item currently in Atlas to the local database
    items.forEach(function(banneritem) {
        data.push(banneritem);
    });
    db.BannerItem.insert(data)
    app.locals.BannerItem = db.BannerItem.find(data)
  })

}