var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Schema = mongoose.Schema;
var board = new mongoose.Schema({
// var board = new mongoose.Schema
   title:  {type: String},
   author: {type: String},
   content: {type: String},
   created_at: {type: String},
   hits: {type: String, default: 0},
   category: {type: String}
   //왜 스트링? 인티져형이아니라?
});

module.exports = mongoose.model('board', board);
// module.exports = mongoose.model('board', board);