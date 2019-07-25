// jshint esversion:6
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
var request = require('request');
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  // console.log(req.body.crypto);
  var baseUrl = "https://apiv2.bitcoinaverage.com/convert/global";
  var options = {
    url: baseUrl,
    method: "GET",
    qs: {
      from: req.body.crypto,
      to: req.body.fiat,
      amount: req.body.amt
    }

  };
  request(options, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.price;
    var currentDate = data.time;

    res.write("<p>The current time is " + currentDate + "</p>    ");


    console.log(price);
    res.write("<h1>The price of " + options.qs.amount+" " + req.body.crypto + " in " + req.body.fiat + " is " + price + "</h1>");
    res.send();
  });

});

app.listen(3000, function() {
  console.log("server started on port 3000");
});
