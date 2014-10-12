// Video.js
// Define the video model
var mongoose = require('mongoose');

var VideoSchema = new mongoose.Schema({
	title: String,
	desc: String,
	video_id: String,
	votes: {Type: Number, default: 0},
	added: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Video', VideoSchema);