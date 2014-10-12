// Video.js
// Handle the routes for videos

// Helper functions
function youtube_parser(url) {
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	var match = url.match(regExp);
	if (match&&match[7].length == 11) {
		return match[7];
	} else {
		return "Bad URL";
	}
}

// Models
var Video = require('../models/video');

module.exports = function(app) {
	app.get('/api/videos', function(req, res) { // Grab all the videos in database
		Video.find(function(err, videos) {
			// If we stumble upon an error, we send those errors instead of a JSON file
			if (err) 
				res.send({"error":err});
			else 
				res.json(videos); // If no error, we send Videos in JSON format
		});
	});

	app.post('/api/videos', function(req, res) { // Called when we post up a new video
		// Before we post the video, we must strip the http/https from the URL!
		var video_id = youtube_parser(req.body.url);

		if (video_id == "Bad URL") { // If the URL is invalid, then we send back an error message
			res.send({"error":"Invalid URL!"});
		} else {
			Video.create({
				title: req.body.title,
				desc: req.body.desc,
				video_id: video_id,
				votes: 0
			}, function(err, video) {
				// Again, if we stumble upon an error, we send that instead
				if (err)
					res.send({"error":err});
				else
					res.send({"success":"Video succesfully posted"}); // If we reach this point, posting was a success. We send a success message instead
			});
		}
	});	

	/* NOTE: Delete hasn't been implemented yet!
	app.delete('/api/videos/:video_id', function(req, res) { // Deletes video
		Video.remove({
			_id: req.params.video_id
		}, function(err, video) {
			if (err)
				res.send(err);
		});
	});
	*/
}
