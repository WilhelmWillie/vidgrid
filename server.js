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

// Routes for our API :-)
require('./app/routes/video')(app);
require('./app/routes/index')(app);

// Vroom vroom, let's go!
var port = 1337; // So l33t
app.listen(port);
console.log("Vroom vroom! We're rolling on port " + port);