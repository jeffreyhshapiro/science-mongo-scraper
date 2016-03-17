var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  comment : {
    type: String
  },
  articleId: {
    type: Schema.Types.ObjectId,
    ref: 'Article'
  }
});

mongoose.connect('mongodb://localhost/scientistComments');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful for scientistComments.');
});


var Comment = mongoose.model('scienceComments', commentSchema)
module.exports = Comment;