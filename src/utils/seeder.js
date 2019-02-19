
const Datastore = require('nedb')
const BannerItem = require('../data/banneritem.json')


module.exports = (app) => {
 
  const db = {}

  db.BannerItem = new Datastore()
 

  db.BannerItem.loadDatabase()
 

  // insert the sample data into our datastore
  db.BannerItem.insert(BannerItem)

  

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.BannerItem = db.BannerItem.find(BannerItem)
  

}