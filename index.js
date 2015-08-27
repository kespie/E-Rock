var express             = require('express');
var app                 = express();
var path 	            = require('path');
var config              = require('./config');

// APP CONFIGURATION ==// ====================================

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/app'));

// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES
app.get ('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

// START THE SERVER
// ===========================================================
app.listen(config.port);
console.log ('Magic happens on port ' + config.port );