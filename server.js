const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('');
var app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.use(expressLayouts);

app.set("view engine", "ejs");

app.get('',function(req, res) {
  res.render("login");
});

app.get('/registration',function(req, res) {
  res.render("registration");
});

app.listen(port, (err) => {
    if (err) {
      return console.log("ERROR: " + err);
    }
    console.log(`Listening on port ${port}`);
  });