var express         = require('express'),
    HomeController  = express.Router();
    


HomeController.route('/?')
  // GET /
  // -----
  // Serve the homepage
  .get(function(req, res, next) {
    res.render('home', {});
  })

module.exports = HomeController;
