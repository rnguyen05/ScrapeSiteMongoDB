

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
    });//.sort({"title":-1});
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


/////////// Note controllers below ///////////////////





exports.deleteNote = function(req,res){
    let noteId = req.params.noteId;
    let ArticleId = req.params.articleId;
    console.log("noteId",noteId);
    console.log("articleId",articleId);
    db.Note.findByIdAndRemove({_id:noteId},function(err){
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            db.Article.findByIdAndUpdate({_id: articleId},{$set:{notes:""}},{new:false})
            .exec(function(err){
                if(err){
                    console.log(err);
                    res.send(err);
                }else{
                    res.send();
                }
            });
        }
    });
};


//Get Note by Id
exports.getNote = function (req, res) {
    let articleId = req.params.id
    console.log(">>>>>>>>headline articleId",articleId);
    db.Article.findOne({ _id: articleId })
    .populate("note")
    .then(function (data) {
        res.send(data);
    });
};


//Add Note Route
exports.addNote = function (req, res) {
    let id = req.params.id;
    let title = req.body.title;
    let body = req.body.body;
    
    let note = {
        title: title,
        body: body,
        headline: id
    };
    db.Note.create(note)
    .then(function(dbNote) {
      return db.Article.findByIdAndUpdate({ _id: id }, {$push: {note: {_id:dbNote._id,title:dbNote.title,body:dbNote.body,headline: dbNote.headline} }});
    })
    .then(function(note) {
        console.log("notes???", note);
      res.json(note);
    })
    .catch(function(err) {
      console.log("err",err);
      res.json(err);
    });
};


