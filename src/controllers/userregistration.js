var express         = require('express'),
    UserController  = express.Router(),
    User            = require('../models/user'),
    bcrypt          = require('bcrypt');


UserController.route('/?')
  // GET /
  // -----
  // Serve the homepage
  .get(function(req, res, next) {
    res.render('userRegistration', {});
    console.log('THIS GET FUNCTION WORKS');
  })
  // POST
  .post(function(req, res, next) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      // Save user 
      User.create({
        name:     req.body.name,
        email:    req.body.email,
        username: req.body.username,
        password: hash
       }, function(err, user) {
        if (err) {
          console.log(err);
          console.log('The error log')
          res.redirect('/userregistration', {error: err});
        } else {
          console.log('THE POST FUNCTION IS WORKING');
          req.session.isLoggedIn = true;
          req.session.userId = user._id;
          res.redirect('/?');
        }
      });
    });
  });  


module.exports = UserController;
