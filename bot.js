var env = require('node-env-file');
env(__dirname + '/.env');

global.__rootdir = __dirname ;
// Set up an Express-powered webserver to expose oauth and webhook endpoints
const webserver = require(__dirname + '/components/express_webserver.js');
//require(__dirname + '/components/routes/incoming_webhook.js');

var db_config = require(__dirname + '/config/database.js')
