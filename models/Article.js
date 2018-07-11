//Require Mongoose
var mongoose = require('mongoose');

//Require the connection
var db = require("../config/connection");

// Create a Schema Class
var Schema = mongoose.Schema;

//Create Article schema
var ArticleSchema = new Schema({
  //Title is a required string
  title: 
  {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  //Link is a required string
  link: 
  {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: false
  },
  summary: {
    type: String,
    default: "No Summary Available"
  },
  saved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  note: [{
    //Store ObjectIds in the array
    type: Schema.Types.ObjectId,
    //The ObjectIds will refer to the ids in the Note model
    ref: "Note"
  }]
});

//Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

//Export the model
module.exports = Article;
