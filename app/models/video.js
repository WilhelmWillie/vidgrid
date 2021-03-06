// Video.js
// Define the video model
var mongoose = require('mongoose');

var VideoSchema = module.exports = new mongoose.Schema({ // Returns the schema instead of the actual model instead
	title: String, // Use chosen video title
	desc: String, // Description of the video
	video_id: String, // YT video ID
	score: {type: Number, default: 0}, // Changed votes to score
	added: {type: Date, default: Date.now}, // Date the video was posted 
	tags: [
		{
			type: String,
			match: /^[a-zA-Z]+$/,
			check: { minLength: 2 }
		}
	]
	// TODO: Add tagging system for videos
});