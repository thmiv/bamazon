const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");

var connection = mysql.createConnection({
  host: "35.188.44.144",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "utcbc",
  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // execute function below
    //createProduct("Stylus Pen", "Accessories", "500000", "25");
    customerPurchase();
});

function createProduct(newItem, newDept, newPrice, newStock) {  // creates a new product and adds it to sqlDb
  console.log("Inserting a new product...\n");
  var query = connection.query(
    "INSERT INTO products SET ?",
    {
      product_name: newItem,
      department_name: newDept,
      customer_price: newPrice,
      stock_quantity: newStock
    },
    function(err, res) {
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      getProducts();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function updateProduct() {
  console.log("Updating all Rocky Road quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: 100
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      //deleteProduct(itemRemove);
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteProduct(itemRemove) {
  console.log("Deleting item...\n");
  connection.query(
    "DELETE FROM products WHERE ?",
    {
      product_name: itemRemove
    },
    function(err, res) {
      console.log(res.affectedRows + " products deleted!\n");
      // Call readProducts AFTER the DELETE completes
      //readProducts();
    }
  );
}

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (i = 0; i < res.length; i++) {
        console.log("Product: " + res[i].product_name + ", Dept: " + res[i].department_name + ", Price: $" + res[i].customer_price + ", Quantity: " + res[i].stock_quantity);
    }

    connection.end();
  });
}

function customerPurchase() {
  var getItemsArrary = [];
  connection.query("SELECT * FROM products", function(err, res) { 
    if (err) { throw err };
    var productArray = [];
    var subProductArray = [];
    for (i = 0; i < res.length; i++) {
        subProductArray.push(res[i].product_name);
        subProductArray.push(res[i].department_name);
        subProductArray.push(res[i].customer_price);
        subProductArray.push(res[i].stock_quantity);
        productArray.push(subProductArray);
        subProductArray = [];
    }
    getItemsArrary = productArray;
    console.log(getItemsArrary);
  });
  
  
  // inquirer.prompt([{
  //   name: "userChoice",
  //   type: "rawlist",
  //   message: "What would you like to purchase?",
  //   choices: ["asdf", "gdfsa", "adafgea"] //getItemsArrary
  // }]).then(function(answer) {
  //   console.log(answer.userChoice);
  // });
}