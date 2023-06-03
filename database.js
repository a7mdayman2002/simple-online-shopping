const express = require("express");
const app = express();
const db = require("./connection");

app.use(express.static("views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let sql1 = "SELECT * FROM products";
  let sql2 = "SELECT * FROM client";
  let data = {};

  db.query(sql1, (err, result1) => {
    if (err) throw err;
    data.products = result1;

    db.query(sql2, (err, result2) => {
      if (err) throw err;
      data.client = result2;

      console.log(data);
      res.render("interface", { data: data });
    });
  });
});

app.get('/buy/:id', function(req, res) {
  const productId = req.params.id;

  // Query the products table to get the product price and quantity
  db.query('SELECT Price, Quantity FROM products WHERE ID = ?', [productId], function(err,results) {
    
    const product = results[0];
    const price = product.Price;
    const quantity = product.Quantity;

    db.query('SELECT Balance FROM client WHERE CLName = ?', ['Ahmed'], function(err, results) {

      const balance = results[0].Balance;

      const newBalance = balance + price;
      const newQuantity = quantity - 1;
      

      db.query('UPDATE client SET Balance = ? WHERE CLName = ?', [newBalance, 'Ahmed'], function() {
        
      });

      db.query('UPDATE products SET Quantity = ? WHERE ID = ?', [newQuantity, productId], function() {
        res.redirect('/');
        
      });
    });
  });
});

app.listen(3000, () => {
  console.log("on port 3000");
});
