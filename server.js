var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser')
var scrapeUrl = 'http://www.the-scientist.com/?articles.list/categoryNo/2884/category/Daily-News/'
var PORT = 3000;
var Article = require('./model/scientistModel.js')
var Comment = require('./model/commentModel.js')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.static('controller'))

request(scrapeUrl, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    $ = cheerio.load(html);
    $('div.articleHeader').each(function(i,element){
      var article = $(this).children('h4').children('a').text();
      var description = $(this).next().text();
      var link = $(this).children('h4').children('a').attr('href');

      if (article && description && link) {
        //If article title is already in the database, the document will not be added
        Article.find({}, 'article', function(err, result){
          if (result.length == 0) {
            var articles = new Article ({
                article: article,
                description: description,
                link: 'http://www.the-scientist.com' + link
              })
              articles.save(function(err, articles){
                if (err) {throw err};
                console.log(articles + " successfully added to database")
              });
          };
          for (var i = 0; i < result.length; i++) {
            if (article == result[i].article) {
              console.log(article+ ' in database')
              article.found = true;
              break;
            };
            if ((i == result.length - 1) && (article.found !== true)) {
              var articles = new Article ({
                article: article,
                description: description,
                link: 'http://www.the-scientist.com' + link
              })
              articles.save(function(err, articles){
                if (err) {throw err};
                console.log(articles + " successfully added to database")
              });
            };
          };
        });
      };
    });
  };
});

app.get('/', function(req, res){
  res.send(index.html)
});

app.get('/articles', function(req, res){
  Article.find(function(err, result){
    res.send(result)
  });
});

app.get('/getcomments', function(req, res){
  Comment.find(function(err, result){
    res.json(result);
  });
});

//The comment feature is not yet done
app.post('/submitcomment', function(req, res){
  var articleComment = req.body.scienceComment
  var scienceArticleId = req.body.scienceArticleId
  var comment = new Comment ({
    comment: articleComment,
    articleId: scienceArticleId
  })
  comment.save(function(err, comment){
    if (err) {
      res.send(err)
    } else {
      res.send(index.html)
    }
  })
})

app.listen(PORT, function(){
  console.log("listening on port "+PORT)
})