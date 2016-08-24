var express         = require('express'),
    HomeController  = express.Router(),
    User = require('../models/user');


HomeController.route('/?')
  // GET /
  // -----
  // Serve the homepage
  .get(function(req, res, next) {
    console.log("Get function is working")
    res.render('home', {});
  })

// POST
// Register a new user
// Find existing user in database
// Serve the Userprofile page after succesful login
.post(function(req, res, next) {
    console.log("Post functon is working")
    User.findOne({username: req.body.username},function(err, user) {
      if(err || !user){
        console.log(err);
        res.render('home',{ message:req.session.isLoggedIn ? true: "Username is not found please register!"});
        } else {
          bcrypt.compare(req.body.password, user.password, function(err, result) {
          if(err){
            console.log(err);
            res.send('ERROR:' + err);
          } else if(result){
            console.log(user)
            req.session.isLoggedIn = true;
            req.session.userId = user._id;
            res.redirect('/userprofile');
          }else{
            res.render('home', {
              message: req.session.isLoggedIn ? true: "Your password is incorrect, please try again!"
             });
          }
        });
      }
    })
});
      












module.exports = HomeController;
