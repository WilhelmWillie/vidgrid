// Server.js
// Set up our server, configure what's needed, then start up the server

// Set up, import necessary libraries
var express = require('express'); // Use express to rev up our app
var app = express ();

var mongoose = require('mongoose'); // Get Mongoose loaded in, object modeling for MongoDB

var morgan = require('morgan') // Used for logging details to console

var bodyParser = require('body-parser'); // POST
var methodOverride = require('method-override'); // DELETE and PUT

// Configure our app details
var db = require('./config/db');
mongoose.connect(db.url); // Connect to MongoDB (Localhost)

app.use(express.static(__dirname + '/public')); // Anything in public folder can be accessed publicly

app.use(morgan('dev')); // Log requests to console

app.use(bodyParser.urlencoded({'extended':'true'})); // Set up parsing
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(methodOverride());

// Define our schema + models
var VideoSchema = new mongoose.Schema({
	title: String,
	desc: String,
	video_id: String,
	votes: {Type: Number, default: 0},
	added: {type: Date, default: Date.now}
});

var Video = mongoose.model('Video', VideoSchema);

// Routes for our API :-)
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

// Application front end
app.get('*', function(req, res) {
	res.sendfile('./public/index.html'); // Load our view file, angular will handle the rest
});

// Vroom vroom, let's go!
var port = 1337; // So l33t
app.listen(port);
console.log("Vroom vroom! We're rolling on port " + port);