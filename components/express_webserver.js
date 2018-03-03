// init project
const express = require('express');
const bodyParser = require('body-parser');
const webserver = express();
//Require Authentication
const REQUIRE_AUTH = true
const AUTH_TOKEN = 'an-example-token'
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

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

webserver.post('/api/v1/webhook', function (req, res) {
  // we expect to receive JSON data from api.ai here.
  // the payload is stored on req.body
  console.log(req.body)

  // we have a simple authentication
  if (REQUIRE_AUTH) {
    if (req.headers['auth-token'] !== AUTH_TOKEN) {
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
  var userName = req.body.result.parameters['resolvedQuery']
  var webhookReply = 'Hello ' + userName + '! Welcome from the webhook.'

  // the most basic response
  res.status(200).json({
    source: 'webhook',
    speech: webhookReply,
    displayText: webhookReply
  })
})
