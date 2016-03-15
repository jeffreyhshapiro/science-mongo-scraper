var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  article: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  link: {
    type: String,
    trim: true
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