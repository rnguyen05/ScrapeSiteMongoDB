//Require cheerio 
const cheerio = require('cheerio');
//Get html
const request = require('request');
//Use Article model
const db = require('../models');

//Define the site we want to scrape
const website = 'https://www.wired.com/most-recent/';

exports.scrapeWeb = function (req, res) {
  request(website, function (err, response, html) {
    const $ = cheerio.load(html);
    let result = {};

    $("li.archive-item-component").each(function(i, element) {
      result.link = 'https://www.wired.com'+$(element).find("a").attr("href");
      result.title = $(element).find("a").find("h2").text().trim();
      result.image = $(element).find("img").attr("src");
      result.summary = $(element).find("p.archive-item-component__desc").text().trim();
      console.log(result);

      db.Article.create(result)
      .then(function(dbArticle){
        //console.log(dbArticle);
      })
      .catch(function(error) {
        console.log(error);
      });
    });
  });
  res.redirect('/');
}
