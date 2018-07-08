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
// function (request, response) {
// 	//Get all the articles
// 	Article.find({}, function (error, data) {
// 		//Check for error getting articles
// 		if (error) console.log("Error Getting Articles ", error);
// 		response.render('index', { title: "News Scraper", articles: data });
// 	});
// }); 

// router.get('/', function (request, response) {
// 	//Get all the articles
// 	Article.find({}, function (error, data) {
// 		//Check for error getting articles
// 		if (error) console.log("Error Getting Articles ", error);
// 		response.render('index', { title: "News Scraper", articles: data });
// 	});
// }); 

//Scrape Route
router.get('/scrape', fetch.scrapeWeb);
// function (request, response) {
// 	// run the scrapeWeb function from scraper
// 	scraper.scrapeWeb(function (error, response) {
// 		// scrape then return to home page
// 		response.redirect('/');
// 	});
// });


// //Scrape Route
// router.get('/scrape', function (request, response) {
// 	// run the scrapeWeb function from scraper
// 	scraper.scrapeWeb(function (error, response) {
// 		// scrape then return to home page
// 		response.redirect('/');
// 	});
// });

//Get Note Route
router.get('/note/:id', function (request, response) {
	Article.findOne({ _id: request.params.id })
		.populate("note")
		.exec( function (error, doc) {
			if (error) console.log("Error Getting Notes", error);
			response.send(doc.note);
		});
});

//Post Note Route
router.post('/note/:id', function (request, response) {
	const newNote = new Note(request.body);
	newNote.save(function (error, doc) {
		Article.findOneAndUpdate(
			{ _id: request.params.id },
			{ $push: { note: doc._id } },
			{ new: true },
			function (err, anotherDoc) {
				if (error) console.log("post error", error);
				response.send(anotherDoc);
			});
	});
});

//Delete Note 
router.post('/deleteNote/:id', function (request, response) {
	console.log(request.params.id);

	Note.findByIdAndRemove({ _id: request.params.id }, function (error) {
		if (error) console.log('error deleting note', error);
		response.send();
	});
});

// This will get the articles scraped and saved in db and show them in list.
router.get("/savedArticles", function (req, res) {
	// Grab every doc in the Articles array
	Article.find({}, function (error, doc) {
		// Log any errors
		if (error) {
			console.log(error);
		}
		// Or send the doc to the browser as a json object
		else {
			let hbsArticleObject = {
				articles: doc
			};
			res.render("savedArticles", hbsArticleObject);
		}
	});
});

router.post("/save", function (req, res) {
	console.log("This is the title: " + req.body.title);
	const newArticleObject = {};
	newArticleObject.title = req.body.title;
	newArticleObject.link = req.body.link;
	const entry = new Article(newArticleObject);
	console.log("We can save the article: " + entry);
	// Now, save that entry to the db
	entry.save(function (err, doc) {
		// Log any errors
		if (err) {
			console.log(err);
		}
		// Or log the doc
		else {
			console.log(doc);
		}
	});
	res.redirect("/");
});


module.exports = router;