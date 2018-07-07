// Dependencies
// ============
const express        = require('express');
const logger         = require('morgan');
const bodyParser     = require('body-parser');
const mongoose       = require("mongoose");
const axios          = require("axios");
const cheerio        = require("cheerio");
const path           = require('path');



// Require the routes and use them
const routes = require('./routes/index');

// Express settings
// ================
// instantiate our app
const app            = express();



/////////////////////////
// This way, we can set certain properties here
// rather than having them take up space in server.js.
//var debug = require('debug')('express-example');

// we bring in the app we exported from server.js
//app = require('../server');

// we bring in the models we exported with index.js
var db = require("./models");




///////////////////////







// view engine setup
app.set('views', path.join(__dirname, 'views'));

//set up handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Import routes
app.use('/', routes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if(err) {
    console.log(err);
    throw err;
  }
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  })
});

// we set the port of the app
app.set('port', process.env.PORT || 3000);
// our module get's exported as app.
module.exports = app;

