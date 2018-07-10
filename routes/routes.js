//Dependencies
const express = require('express');
const router = express.Router();
// const db = require('../models');
const Note = require('../models/Note');
const Article = require('../models/Article');
const fetch = require('../controller/fetch');
const headline = require('../controller/headline');


//Home Page Route
router.get('/', headline.index);

//Scrape Web Route
router.get('/scrape', fetch.scrapeWeb);

//Get All Saved Articles
router.get("/saved", headline.savedArticles);

//Get Article to add Note
router.get("/article/:id", headline.getArticle);

//Save Article Route
router.post("/saved/:id", headline.saveArticle);

//Unsave Article Route
router.post("/unsaved/:id", headline.unsaveArticle);

//Get Note by Id Route
router.get('/getNote/:id', headline.getNote);

//Save Note Route
router.post("/addNote/:id", headline.addNote);

//Delete Note Route
router.post('/deleteNote/:noteId', headline.deleteNote);




// // This will get the articles scraped and saved in db and show them in list.
// router.get("/savedArticles", function (req, res) {
// 	// Grab every doc in the Articles array
// 	Article.find({}, function (error, doc) {
// 		// Log any errors
// 		if (error) {
// 			console.log(error);
// 		}
// 		// Or send the doc to the browser as a json object
// 		else {
// 			let hbsArticleObject = {
// 				articles: doc
// 			};
// 			res.render("savedArticles", hbsArticleObject);
// 		}
// 	});
// });



// //Get Note Route
// router.get('/note/:id', function (request, response) {
// 	Article.findOne({ _id: request.params.id })
// 		.populate("note")
// 		.exec( function (error, doc) {
// 			if (error) console.log("Error Getting Notes", error);
// 			response.send(doc.note);
// 		});
// });

// //Post Note Route
// router.post('/note/:id', function (request, response) {
// 	const newNote = new Note(request.body);
// 	newNote.save(function (error, doc) {
// 		Article.findOneAndUpdate(
// 			{ _id: request.params.id },
// 			{ $push: { note: doc._id } },
// 			{ new: true },
// 			function (err, anotherDoc) {
// 				if (error) console.log("post error", error);
// 				response.send(anotherDoc);
// 			});
// 	});
// });

// //Delete Note 
// router.post('/deleteNote/:id', function (request, response) {
// 	console.log(request.params.id);

// 	Note.findByIdAndRemove({ _id: request.params.id }, function (error) {
// 		if (error) console.log('error deleting note', error);
// 		response.send();
// 	});
// });






module.exports = router;