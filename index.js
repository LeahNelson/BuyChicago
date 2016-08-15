// 
// =========
// This file is the main server startup script

// Require dependencies
// _______________________
var express = require('express'),
    app     = express(),
    exphbs  = require('express-handlebars'),
    bodyParser = require('body-parser');


// Configuration
// -------------
app.engine('hbs', exphbs({
  defaultLayout: 'default',
  extname: '.hbs',
  layoutsDir: __dirname + '/src/views/layouts/',
  // partialsDir: __dirname + '/src/views/partials/'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/src/views');
app.use(bodyParser.urlencoded({extended: true}))

// Connect to database
// -------------------
require

// Middleware
// ----------
app.use(express.static(__dirname + '/src/public')); // Serve static files
app.use(require('./src/controllers/home'));



// Start the server
// ----------------
var server = app.listen(3000, function() {
  console.log('App is running');
});
