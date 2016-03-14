var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  article: {
    type: String
  },
  description: {
    type: String
  },
  link: {
    type: String
  }
});

mongoose.connect('mongodb://localhost/scientistArticles');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful for scientistArticles.');
});

var Article = mongoose.model('scienceArticles', articleSchema)
module.exports = Article;