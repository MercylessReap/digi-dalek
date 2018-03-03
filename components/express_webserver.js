// init project
const express = require('express');
const bodyParser = require('body-parser');
const webserver = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

webserver.use(bodyParser.json());
webserver.use(bodyParser.urlencoded({ extended: true }));
webserver.use(express.static('public'));
webserver.listen(process.env.PORT || 3000, null, function() {
//  debug('Express webserver configured and listening at http://localhost:' + process.env.PORT || 3000);  
});