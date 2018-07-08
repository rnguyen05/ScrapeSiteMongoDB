

const db = require('../models');

//Render all Articles in database
exports.index = function (req, res) {
	//Get all the articles
	db.Article.find({}, function (error, data) {
		//Check for error getting articles
        if (error) console.log("Error Getting Articles ", error);
        res.render('index', { title: "News Scraper", articles: data });	
    });//.sort({"title":-1});
}; 

//Save Article by flipping saved boolean flag to true
exports.saveArticle = function (req, res) {
    let articleId = req.params.id;
    console.log("inside headline/saveArticle ",articleId);
    db.Article.findById(articleId, function (err, data) {
        if (data.saved) {
            db.Article.findByIdAndUpdate(articleId, 
                { $set: { saved: false } }, { new: true }, function (err, data) {
                    if (err) console.log(err);
                    console.log("Article is saved");
            });
        }
        else {
            db.Article.findByIdAndUpdate(articleId, 
                { $set: { saved: true } }, { new: true }, function (err, data) {
                    if (err) console.log(err);
                //res.render('index');
                    console.log("Article is saved");
            });
        }
    });
    res.render('index');
};

//Unsave Article by flipping saved boolean flag to true
exports.unsaveArticle = function (req, res) {
    let articleId = req.params.id;

    db.Article.findById(articleId, function (err, data) {
        if (data.saved) {
            db.Article.findByIdAndUpdate(articleId, 
                { $set: { saved: false } }, { new: false }, function (err, data) {
                    if (err) console.log(err);
                    console.log("Article is unsaved");
                    
            });
        } 
    });
    res.render('savedArticles');
};


//Render all Saved Articles in database
exports.savedArticles = function (req, res) {
	//Get all the articles
	db.Article.find({"saved": true}, function (error, data) {
		//Check for error getting articles
        if (error) console.log("Error Getting Articles ", error);
        res.render('savedArticles', { title: "News Scraper", articles: data });	
    });//.sort({"title":-1});
}; 
    



