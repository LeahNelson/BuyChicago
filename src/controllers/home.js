var express         = require('express'),
    HomeController  = express.Router(),
    User = require('../models/user'),
    Property = require('../models/property');


HomeController.route('/?')
  // GET /
  // -----
  // Serve the homepage
  .get(function(req, res, next) {
    res.render('home', {});
  })

// POST
// Register a new user
// Find existing user in database
// Serve the Userprofile page after succesful login
.post(function(req, res, next) {
  
    console.log("Post functon is working")
    
});
      












module.exports = HomeController;
