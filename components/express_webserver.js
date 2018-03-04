
// init project
const express = require('express');
const bodyParser = require('body-parser');
const webserver = express();
//Require Authentication
const REQUIRE_AUTH = true
const access_token = process.env.access_token

webserver.use(bodyParser.json());
webserver.use(bodyParser.urlencoded({ extended: true }));
webserver.use(express.static('public'));
webserver.listen(process.env.PORT || 3000, null, function() {
//  debug('Express webserver configured and listening at http://localhost:' + process.env.PORT || 3000);  
});
// webhook url
webserver.get('/api/v1/webhook', function (req, res) {
  res.send('You must POST your request')
})

webserver.get('/admin', function (req, res) {
  res.sendFile(__dirname + '/private/index.html');
})

webserver.post('/api/v1/webhook', function (req, res) {
  // we expect to receive JSON data from api.ai here.
  // the payload is stored on req.body
  console.log(req.body)

  // we have a simple authentication
  if (REQUIRE_AUTH) {

    if (req.headers['auth-token'] !== access_token) {

      return res.status(401).send('Unauthorized')
    }
  }
  // and some validation too
  if (!req.body || !req.body.result || !req.body.result.parameters) {
    return res.status(400).send('Bad Request')
  }

  // the value of Action from api.ai is stored in req.body.result.action
  console.log('* Received action -- %s', req.body.result.action)

  
  // parameters are stored in req.body.result.parameters
  var request = req.body.result;
  var country = req.body.result.parameters['Country'];
  var webhookReply
  
  var routes = require(__dirname + '/components/routes/incoming_webhook.js');
  routes.country



  // the most basic response
  res.status(200).json({
    source: 'webhook',
    speech: webhookReply,
    displayText: webhookReply
  })
})
