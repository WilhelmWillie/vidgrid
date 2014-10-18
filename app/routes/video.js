// Video.js
// Handle the routes for videos

// Controller
var controller = require('../controllers/video');

module.exports = function(app) {
	app.get('/api/videos', controller.getAllVideos); // Return all video data in JSON format

	app.post('/api/videos', controller.postVideo); // Post video data to database

	app.get('/api/videos/search/:tag', controller.searchTag);
}
