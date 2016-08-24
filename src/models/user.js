// User Model
// ----------
// Representation of a user as an object

var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
  name:     String,
  email:    String,
  username: String,
  password: String
}, {
  strict: false
});


module.exports = mongoose.model('User', UserSchema);
