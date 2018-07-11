//Require mongoose
const mongoose = require("mongoose");

//Require the connection
const db = require("../config/connection");

//Create a schema class
const Schema = mongoose.Schema;

//Create the Note schema
const NoteSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  body: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  }
});

//Create the Note model with the NoteSchema
const Note = mongoose.model("Note", NoteSchema);

//Export the Note model
module.exports = Note;