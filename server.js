const express = require("express");
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('');
var app = express();
const port = process.env.port || 255;

app.get('/',function(req,res) {
  res.sendFile(__dirname + '/test.html');
});

app.listen(port, (err) => {
    if (err) {
      return console.log("ERROR: " + err);
    }
    console.log(`Listening on port ${port}`);
  });