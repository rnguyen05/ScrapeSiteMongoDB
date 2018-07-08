const db = require('../models');

exports.index = function (req, res) {
	//Get all the articles
	db.Article.find({}, function (error, data) {
		//Check for error getting articles
		if (error) console.log("Error Getting Articles ", error);
		res.render('index', { title: "News Scraper", articles: data });
	});
}; 



