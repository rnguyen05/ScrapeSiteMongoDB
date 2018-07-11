// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const handlebars = require('express-handlebars');

// Require the routes and use them
const routes = require('./routes/routes');

// Initialize Express
const app = express();

// set up the HBS view engine
app.engine('handlebars', handlebars({defaultLayout: 'main', extname: 'handlebars', partialsDir: [__dirname + '/views/partials']}));
app.set('view engine', 'handlebars');


// Use morgan for debug logging
app.use(logger("dev"));

// set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// set the public static directory
app.use(express.static('public'));

// Import routes
app.use('/', routes);

// Launch App
const port = process.env.PORT || 3000;

app.listen(port, function()
{
  console.log('Running on port: ' + port);
});
