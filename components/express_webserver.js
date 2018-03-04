
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
  res.sendFile(global.__rootdir + '/private/index.html');
})
webserver.get('/login', function (req, res) {
  res.sendFile(global.__rootdir + '/private/login.html');
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
  
 
    switch(country)
  {
      case "United Kingdom":
        webhookReply = 'Dimension Data has eight offices in the UK. There are 2 offices located in Cheshire and London, there is also an office in Glasgow, Hampshire (Head Office), Lichfield and Milton. To get more detailed information about their locations please click on this link: https://www2.dimensiondata.com/en/locations/united-kingdom'
        break;
      case "Switzerland":
        webhookReply = "Dimension Data has two offices in Switzerland. The offices are located in Lausanne and Wallisellen. To get more detailed information about their locations please click on this link: https://www2.dimensiondata.com/en/locations/switzerland";
        break;
      case "Spain":
        webhookReply = "";
        break;
      case "Spain":
        webhookReply = "";
        break;
      case "Spain":
        webhookReply = "";
        break;
      case "Spain":
        webhookReply = "";
        break;
      case "Spain":
        webhookReply = "";
        break;
      default:
        webhookReply = "switch";
  }



  // the most basic response
  res.status(200).json({
    source: 'webhook',
    speech: webhookReply,
    displayText: webhookReply
  })
})
