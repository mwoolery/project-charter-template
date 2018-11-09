var mongoose = require('mongoose')
    , Schema = mongoose.Schema


//description is the text that displays in the banner
//startDate will be the datetime that it starts displaying
//endDate will be the datetime that it ends    
var BannerItemSchema = new Schema({
	_id: { type: Number, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true},
    endDate: { type: Date, required: true}
})

var bannerItem = mongoose.model('BannerItem', BannerItemSchema)
//module.exports = BannerItem
