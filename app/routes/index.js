// Index.js
// Routes all other incoming requests to index.html
module.exports = function(app) {
	// Application front end
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // Load our view file, angular will handle the rest
	});
}