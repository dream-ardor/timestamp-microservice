// server.js
// where your node app starts

var express = require('express');
var app = express();
var moment = require('moment');

//list input format
const formats = [
        "X",
        "YYYY-MM-D",
        "D-MM-YYYY",
        "MMMM D, YYYY",
        "MMMM D YYYY",
        "MMM D, YYYY",
        "MMM D YYYY",
        "D MMMM YYYY",
        "D MMMM YY",
        "D MMM YYYY",
        "D MMM YY",
];

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
// "say hello"

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'Hello, Welcome!'});
});

app.get("/api/timestamp/:date_string", (req, res) => {
  var date = moment(req.params.date_string, formats);
  if(date.isValid()) {
     var unixDate = date.format("X") * 1000;
     var naturalDate = date.toDate();
     res.json({"unix": unixDate, "utc": naturalDate.toUTCString()});
     }else {
      res.json({"unix": null, "utc": "Invalid Date"});
     }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
