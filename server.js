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

app.get('/stock',function(req, res) {
  res.render("stock", {title: "DiNMS - Stock"});
});

// Gathers order from client.
app.post('/post-order',function(req, res) {
  db.run(`insert into Sale(sale_date, payment_method) values(datetime('now'), "cash");`);
  req.body.order.forEach(function(item){
    // Get latest sale.
    const latest_sale_query = "select id from Sale order by id desc limit 1;";
    // Query all items in the order and assign the item id to the sale id.
    db.all(latest_sale_query, [], function(err, rows) {
      if (err) {
        throw err;
      }
      db.run(`insert into SaleOrder values(${JSON.stringify(rows[0].id)}, 
        ${JSON.stringify(item.id)});`);
    });
    // Find all ingredients for each item.
    const all_ingredients_for_item_query = `
      select stock_id 
      from Ingredient 
      where product_id = ${JSON.stringify(item.id)};
    `;
    db.all(all_ingredients_for_item_query, [], function(err, item){
      if(err){
        throw err;
      }
      item.forEach(function(ingredient){
        // Subtract amount used from current stock balance.
        const get_amount_used_query = `
          select amount_used 
          from Ingredient 
          where stock_id = "${ingredient.stock_id}";
        `;
        const get_current_stock_query = `
          select current_stock 
          from Stock 
          where id = "${ingredient.stock_id}";
        `;
        // Get amount used for each ingredient.
        db.all(get_amount_used_query, [], function(err, amount_used){
          // au is short for amount used.
          var au = amount_used[0].amount_used;
          // Get stock used.
          db.all(get_current_stock_query, [], function(err, current_stock){
            // Subtraction.
            var new_current_stock = current_stock[0].current_stock - au;
            // Update current stock balance.
            db.run(`
              update Stock 
              set current_stock = "${new_current_stock}"
              where id = "${ingredient.stock_id}";
            `);
          });
        });
      });
    });
  });

  return res.status(200);
});

// Listening on port.
app.listen(port, (err) => {
    if (err) {
      return console.log("ERROR: " + err);
    }
    console.log(`Listening on port ${port}`);
});

app.get('/get-products', function (req, res) {
  let all_products_query = `select * from Product;`;
  // Execute SQL queries.
  db.all(all_products_query, [], function(err, rows) {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
});


app.get('/get-stock', function (req, res) {
  let all_stock_query = `select * from Stock;`;
  // Execute SQL queries.
  db.all(all_stock_query, [], function(err, rows) {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
});

