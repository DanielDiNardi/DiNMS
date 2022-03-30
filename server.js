const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('dinms.db');
var app = express();
const port = process.env.PORT || 3000;
var get_items_of_category;

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

// Listening on port.
app.listen(port, (err) => {
  if (err) {
    return console.log("ERROR: " + err);
  }
  console.log(`Listening on port ${port}`);
});

// Renders sales page.
app.get('',function(req, res) {
  res.render("sales", {title: "DiNMS - Sales"});
});

// Renders stock page.
app.get('/stock',function(req, res) {
  res.render("stock", {title: "DiNMS - Stock"});
});

// Gathers order from client.
app.post('/post-order',function(req, res) {
  
  addToSaleTable(req.body.total);

  organiseSaleItems(req.body.order);

  return res.status(200).send();
});

// Receives category id from client and generates an SQL query.
app.post('/post-category',function(req, res) {
  get_items_of_category = `
    select id, name, price 
    from ProductCategory 
    join Product on ProductCategory.product_id = Product.id
    where category_id = "${req.body.category_id}";
  `;

  return res.status(200).send();
});

// Sends items of category chosen.
app.get('/get-category-items', function (req, res) {

  // Execute SQL queries.
  db.all(get_items_of_category, [], function(err, rows) {
    if (err) {
      throw err;
    }
    return res.status(200).send(rows);
  });
});

// Sends all products when app starts.
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

// Sends all stock items to the user.
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

// Sends all categories for category nav bar.
app.get('/get-category', function (req, res) {
  let all_category_query = `select * from Category;`;
  // Execute SQL queries.
  db.all(all_category_query, [], function(err, rows) {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
});

function addToSaleTable(total){

  db.run(`insert into Sale(sale_date, total_money, payment_method) values(datetime('now'), ${total}, "cash");`);
}

function assignSaleItemToSale(id, amount){

  // Get latest sale.
  const latest_sale_query = "select id from Sale order by id desc limit 1;";

  // Query all items in the order and assign the item id to the sale id.
  db.all(latest_sale_query, [], function(err, rows) {
    if (err) {
      throw err;
    }
    db.run(`insert into SaleOrder values(${JSON.stringify(rows[0].id)}, 
      ${JSON.stringify(amount)},
      ${JSON.stringify(id)});`);
  });
}

function organiseSaleItems(order){
  order.forEach(function(item){

    assignSaleItemToSale(item.id, item.amount);

    findIngredients(item.id, item.amount);
  });
}

function findIngredients(id, amount){
  
  // Find all ingredients for each item.
  const all_ingredients_for_item_query = `
    select stock_id 
    from Ingredient 
    where product_id = '${id}';
  `;

  db.all(all_ingredients_for_item_query, [], function(err, item){
    if(err){
      throw err;
    }
    item.forEach(function(ingredient){

      calculateStock(ingredient.stock_id, amount);
    });
  });
}

function calculateStock(id, amount){

  
  // Subtract amount used from current stock balance.
  const get_amount_used_query = `
    select amount_used 
    from Ingredient 
    where stock_id = "${id}";
  `;
  const get_current_stock_query = `
    select current_stock 
    from Stock 
    where id = "${id}";
  `;

  // Get amount used for each ingredient.
  db.all(get_amount_used_query, [], function(err, amount_used){

    // au is short for amount used.
    var au = amount_used[0].amount_used * amount;

    // Get stock used.
    db.all(get_current_stock_query, [], function(err, current_stock){

      // Subtraction.
      var new_current_stock = current_stock[0].current_stock - au;

      updateStock(new_current_stock, id);      
    });
  });
}

function updateStock(curr, id){

  // Update current stock balance.
  db.run(`
    update Stock 
    set current_stock = ${curr}
    where id = "${id}";
  `);
}