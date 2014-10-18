// Video.js
// Controller for handling video data [ CRUD :-) ]

// Models
var mongoose = require('mongoose');
var Video = mongoose.model('Video', require('../models/video')); // models/*.js returns the schema

function youtube_parser(url) {
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	var match = url.match(regExp);
	if (match&&match[7].length == 11) {
		return match[7];
	} else {
		return "Bad URL";
	}
}

function stringToTags(str) {
	return str.split(" ");
}

// Export controller logic
module.exports = {
	// Returns all videos available
	getAllVideos: function(req, res) {
		Video.find(function(err, videos) {
			// If we stumble upon an error, we send those errors instead of a JSON file
			if (err) 
				res.send({"error":err});
			else 
				res.json(videos); // If no error, we send Videos in JSON format
		});
	},

	// Post video data to database
	postVideo: function(req, res) {
		// Before we post the video, we must strip the http/https from the URL!
		var video_id = youtube_parser(req.body.url);

		var tags = stringToTags(req.body.tags);

		if (video_id == "Bad URL") { // If the URL is invalid, then we send back an error message
			res.send({"error":"Invalid URL!"});
		} else {
			Video.create({
				title: req.body.title,
				desc: req.body.desc,
				video_id: video_id,
				tags: tags
			}, function(err, video) {
				// Again, if we stumble upon an error, we send that instead
				if (err)
					res.send({"error":err});
				else
					res.send({"success":"Video succesfully posted"}); // If we reach this point, posting was a success. We send a success message instead
			});
		}
	}
}