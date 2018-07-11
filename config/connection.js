//Require mongoose
const mongoose = require('mongoose');

//Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

//local database connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapewired";
mongoose.connect(MONGODB_URI
  );

// mongoose.connect("mongodb://localhost/scrapewired");

mongoose.connect('mongodb://heroku_82cw7xkr:sbq98ufe25nk8bhjeff7h0ab03@ds129801.mlab.com:29801/heroku_82cw7xkr');

const db = mongoose.connection;

//Show any mongoose errors
db.on("error", function(error) 
{
  console.log("Mongoose Error: ", error);
});

//Mongoose connedtion to db
db.once("open", function() 
{
  console.log("Mongoose connection successful!");
});

//Export the database
module.exports = db;
