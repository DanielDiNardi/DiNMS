const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('dinms.db');
var app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.use(expressLayouts);
app.use(express.json());

// Sets EJS layout and view engine.
app.set("layout", "./layouts/layout")
app.set("view engine", "ejs");

// Renders homepage for the demo.
app.get('',function(req, res) {
  res.render("demo", {title: "DiNMS - Demo"});
});

// Gathers order from client.
app.post('/post-order',function(req, res) {
  console.log(req.body.order);
  return res.status(200);
});

// Listening on port.
app.listen(port, (err) => {
    if (err) {
      return console.log("ERROR: " + err);
    }
    console.log(`Listening on port ${port}`);
});

// SQL queries.
let sql = `select * from product;`;

// Execute SQL queries.
db.all(sql, [], function(err, rows) {
  if (err) {
    throw err;
  }
  // Sends query result to client.
  app.get('/get-products', function (req, res) {
    res.send(rows);
  });
});

// Closes the database.
db.close();