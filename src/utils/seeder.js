
const Datastore = require('nedb')
const BannerItem = require('../data/banneritem.json')
const Model = require("../models/bannerItem.js");

module.exports = (app) => {
 
  const db = {}

  db.BannerItem = new Datastore()
 

  db.BannerItem.loadDatabase()
 

  // insert the sample data into our datastore
 

  

  // initialize app.locals (these objects will be available to our controllers)
  
  Model.find({}, function(err, items) {
    var data = [];

    items.forEach(function(banneritem) {
        data.push(banneritem);
    });
    db.BannerItem.insert(data)
    app.locals.BannerItem = db.BannerItem.find(data)
  })

}