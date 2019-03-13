//Model for Banneritem

// Require Mongoose to perform database actions
var mongoose = require('mongoose')
    , Schema = mongoose.Schema


// Banner Item Schema, _id, description, startDate, endDate, startTime, endTime, priority and link fields  
var BannerItemSchema = new Schema({
	_id: { type: Number, required: true },description: { type: String, required: true },startDate: { type: String, required: true},endDate: { type: String, required: true},startTime: { type: String, required: true},endTime: { type: String, required: true},priority: { type: Boolean, required: false},link: { type: String, required: false}
})

// create the mongoose model
var bannerItem = mongoose.model('BannerItem', BannerItemSchema)



//export it so app.js can use it.
module.exports = bannerItem

