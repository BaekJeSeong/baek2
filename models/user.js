var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var user = new mongoose.Schema({
    id: {type: String},
    pw: {type: String}
});

user.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
  };

user.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.pw);
  };

module.exports = mongoose.model('user', user);