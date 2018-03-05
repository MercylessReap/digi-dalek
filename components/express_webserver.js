
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
  var requestIntent = req.body.result.metadata['intentName'];
  var country = req.body.result.parameters['Country'];
  var keyword = req.body.result.parameters['keyword'];
  var city = req.body.result.parameters['geo-city'];
  var webhookReply
  //Process webhook based on intent name
  console.log(requestIntent)


  switch(requestIntent)
  {
      case "support-number" || "support-number - country":
     con.query('SELECT * FROM Europe WHERE country = ?',[country], function(err, rows) {
        if (err)
          throw err;
        console.dir(rows);
        
        for(var item of rows) {
          console.log('item: ', [item.id]);
          var queryNumber = [item.phone_number] ;
          console.log(queryNumber);
        }
        
        if (country == 'United Kingdom' || country == 'Ireland' ){
          webhookReply = 'Your IT support number is: ' + queryNumber + " Why don\'t you try raising a ticket directly via ITSM?";
        }else{
          webhookReply = 'Your IT support number is: ' + queryNumber;
        }
         // the most basic response
        res.status(200).json({
          source: 'webhook',
          speech: webhookReply,
          displayText: webhookReply
        })
      });

        break;
      
      case "offices":
      
      con.query('SELECT * FROM Europe WHERE country = ?',[country], function(err, rows) {
        if (err)
          throw err;
        console.dir(rows);
        
        for(var item of rows) {
          console.log('item: ', [item.id]);
          var queryOffices = [item.offices] ;
          var queryofficeAmount = [item.office_amount] ; 
        }
        if(country == null){
             webhookReply = "No Country specified ";
           }else if(queryOffices == null){
             webhookReply = "No offices found for "+country;
           }else{
             webhookReply = "Dimension Data has "+queryofficeAmount+" offices in the "+country+". The "+queryofficeAmount+" offices are located in "+queryOffices+". To get more detailed information about their location please click on this link: https://www2.dimensiondata.com/en/locations/"+country;
           }
        console.log(webhookReply);
        // the most basic response
        res.status(200).json({
          source: 'webhook',
          speech: webhookReply,
          displayText: webhookReply
        })
      });
      
        break;
      
      case "General":
      
        con.query('SELECT * FROM general WHERE keyword = ?',[keyword], function(err, rows) {
          if (err)
            throw err;
            console.dir(rows);
        
        for(var item of rows) {
          console.log('item: ', [item.id]);
          var queryInfo = [item.info];
          //console.log(queryInfo);
        }
        //queryInfo = [item.keyword] ;
          webhookReply =  " info: "+queryInfo;
          
        // the most basic response
        res.status(200).json({
          source: 'webhook',
          speech: webhookReply,
          displayText: webhookReply
        })
      
        })
        
        break;
  }
  


  // the most basic response
  res.status(200).json({
    source: 'webhook',
    speech: webhookReply,
    displayText: webhookReply
  })
})
