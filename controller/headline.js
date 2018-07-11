

const db = require('../models');

//Render all Articles in database
exports.index = function (req, res) {
	//Get all the articles
	db.Article.find({}, function (error, data) {
		//Check for error getting articles
        if (error) console.log("Error Getting Articles ", error);
        res.render('index', { title: "News Scraper", articles: data });	
    }).sort({"createdAt":-1});
}; 

//Save Article by flipping saved boolean flag to true
exports.saveArticle = function (req, res) {
    let articleId = req.params.id;
    db.Article.findById(articleId, function (err, data) {
        if (!data.saved) {
            db.Article.findByIdAndUpdate(articleId, 
                { $set: { saved: true } }, { new: true }, function (err, data) {
                    if (err) {
                        console.log(err);
                        return handleError(err);
                    }
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
                    if (err) {
                        console.log(err);
                        return handleError(err);
                    }
                    console.log("Article is unsaved");
            });
        } 
    });
    res.render('savedArticles');
};

//Render all Saved Articles in database
exports.savedArticles = function (req, res) {
	//Get all the articles
	db.Article.find({"saved": true}, function (err, data) {
		//Check for error getting articles
        if (err) {
            console.log("Error Getting Articles ", err);
            return handleError(err);
        }
        res.render('savedArticles', { title: "News Scraper", articles: data });	
    }).sort({"createdAt":-1});
}; 
    
//Get Article by flipping saved boolean flag to true
exports.getArticle = function (req, res) {
    let articleId = req.params.id;

    db.Article.findById(articleId, function (err, data) {
        if (err) {
            console.log("Error Getting Article ", err);
            return handleError(err);
        } else {
            res.render('savedArticles', { title: "News Scraper", articles: data });	
        }
    });
};

//Delete Note
exports.deleteNote = function(req,res){
    console.log(req.params);
    let noteId = req.params.noteId;
    let articleId = req.params.articleId;
    console.log("noteId",noteId);
    console.log("articleId",articleId);
    db.Note.findByIdAndRemove({_id:noteId},function(err, result){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            db.Article.findByIdAndUpdate({_id: articleId}, {$pull: {note: noteId}}, {safe: true, upsert: true},
            function (err, result) {
                if (err) {
                    console.log(err);
                }
                res.send("successfully removed note");
            })
        }
    });
};

//Get Note by Id
exports.getNote = function (req, res) {
    let articleId = req.params.id
    db.Article.findOne({ _id: articleId })
    .populate("note")
    .then(function (data) {
        res.send(data);
    });
};

//Add Note
exports.addNote = function (req, res) {
    let id = req.params.articleId;
    let title = req.body.title;
    let body = req.body.body;
    
    let note = {
        title: title,
        body: body,
        article: id
    };
    db.Note.create(note)
    .then(function(dbNote) {
        return db.Article.findByIdAndUpdate({ _id: id }, 
            {$push: { 
                note: {
                    _id: dbNote._id,
                    title: dbNote.title,
                    body: dbNote.body,
                    article: dbNote.article
                } 
            }
        });
    })
    .then(function(note) {
      res.json(note);
    })
    .catch(function(err) {
      console.log("err",err);
      res.json(err);
    });
};


