var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Schema = mongoose.Schema;
var comment = new mongoose.Schema({
// var board = new mongoose.Schema
   super: {type: String},
   author: {type: String},
   content: {type: String},
   created_at: {type: String}
   //왜 스트링? 인티져형이아니라?
});

module.exports = mongoose.model('comment', comment);
// module.exports = mongoose.model('board', board);