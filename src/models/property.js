// Property Model
// ----------------

var mongoose = require('mongoose');

var PropertySchema = new mongoose.Schema ({
  pin:                  String,
  streetNumber:         Number,
  dir:                  String,
  streetName:           String,
  type:                 String,
  soft:                 Number,
  ward:                 Number,
  communityArea:        String,
  zoningClassification: String,
  tifdistrict:          String,
  location:             String
}, {
  strict: false
});

module.exports = mongoose.model('Property', PropertySchema);
