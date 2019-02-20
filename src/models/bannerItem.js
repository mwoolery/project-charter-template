var mongoose = require('mongoose')
    , Schema = mongoose.Schema


//description is the text that displays in the banner
//startDate will be the datetime that it starts displaying
//endDate will be the datetime that it ends    
var BannerItemSchema = new Schema({
	_id: { type: Number, required: true },description: { type: String, required: true },startDate: { type: String, required: true},endDate: { type: String, required: true},startTime: { type: String, required: true},endTime: { type: String, required: true},priority: { type: Boolean, required: false},link: { type: String, required: false}
})

var bannerItem = mongoose.model('BannerItem', BannerItemSchema)

module.exports = bannerItem

