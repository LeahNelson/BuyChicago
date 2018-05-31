// 
// =========
// This file is the main server startup script

// Require dependencies
// _______________________
var express = require('express'),
    app = express(),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    session = require('express-session');
// dotenv = require('dotenv').config() || process.env.NODE_ENV;



// Configuration
// -------------
app.engine('hbs', exphbs({
    defaultLayout: 'default',
    extname: '.hbs',
    layoutsDir: __dirname + '/src/views/layouts/',
    partialsDir: __dirname + '/src/views/partials/'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/src/views');
app.use(bodyParser.urlencoded({ extended: true }))

// Connect to database
// -------------------
require('./src/config/db');


// Configure session middleware
// ----------------------------
app.use(session({
    name: 'usersession',
    resave: false,
    saveUninitialized: false,
    secret: 'dbfcebhfqie'
}))

// Middleware
// ----------
app.use(express.static(__dirname + '/src/public')); // Serve static files
app.use('/userregistration', require('./src/controllers/userregistration'));
app.use(require('./src/controllers/home'));
app.use('/?', function(req, res, nest) {
    if (req.session.isLoggedIn === true) {
        return next();
    } else {
        res.redirect('/?')
    }
})




// Start the server
// ----------------
var server = app.listen(3000, function() {
    console.log('App is running');
});