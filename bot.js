var env = require('node-env-file');
env(__dirname + '/.env');
// Set up an Express-powered webserver to expose oauth and webhook endpoints
//const webserver = require(__dirname + '/components/express_webserver.js');
//require(__dirname + '/components/routes/incoming_webhook.js');
const express = require('express');
const bodyParser = require('body-parser');
const webserver = express();
webserver.use(bodyParser.json());
webserver.use(bodyParser.urlencoded({ extended: true }));
webserver.use(express.static('public'));
webserver.listen(process.env.PORT || 3000, null, function() {
//  debug('Express webserver configured and listening at http://localhost:' + process.env.PORT || 3000);  
});

webserver.get('/admin', function (req, res) {
  res.sendFile(__dirname + '/private/index.html');
})

//var db_config = require(__dirname + '/config/database.js')
