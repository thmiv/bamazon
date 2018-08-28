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

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // execute database function below
  //createProduct("Stylus Pen", "Accessories", "500000", "25");
  customerPurchase();
});

function readProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (i = 0; i < res.length; i++) {
      console.log(chalk.green(res[i].item_id) +" "+ chalk.yellow(res[i].product_name) + ", Dept: " + chalk.blue(res[i].department_name) + ", Price: $" + chalk.cyanBright(res[i].customer_price) + ", Quantity: " + chalk.magenta(res[i].stock_quantity));
    }
    console.log(" ");
  });
}

function customerPurchase() {
  readProducts();
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) { throw err };

    inquirer.prompt([
      {
        name: "userChoice",
        type: "rawlist",
        message: "What would you like to purchase?",
        choices: function () {
          var productArray = [];
          for (i = 0; i < res.length; i++) {
            productArray.push(res[i].product_name);
          }
          return productArray;
        }
      },
      {
        name: "answerAmount",
        type: "input",
        message: "Please enter in the amount you would like to buy: "
      }
    ]).then(function (answer) {
      //console.log(answer.userChoice);
      if (Number.isInteger(parseInt(answer.answerAmount)) && (parseInt(answer.answerAmount) > 0)) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < res.length; i++) {
          if (res[i].product_name === answer.userChoice) {
            chosenItem = res[i];
          }
        }
        // determine it is available
        if ((chosenItem.stock_quantity - parseInt(answer.answerAmount)) >= 0) {
          var purchaseCost = chosenItem.customer_price * parseInt(answer.answerAmount);
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: (chosenItem.stock_quantity - parseInt(answer.answerAmount))
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function (error) {
              if (error) { throw err };
              console.log("\nItem(s) bought successfully! Total cost: $" + chalk.red(purchaseCost));
              shopAgain();
            }
          );
        } else {
          // quantity wasn't high enough, so apologize and start over
          console.log("\nSorry, there is not enough available. Please try again...");
          shopAgain();
        }
      } else {
        console.log("Sorry, please enter an integer amount greater than zero...");
        shopAgain();
      }
    });
  });
}

function shopAgain() {
  console.log(" ");
  inquirer.prompt([
    {
      name: "userShop",
      type: "confirm",
      message: "Would you like to continue shopping?",
      default: true
    }
  ]).then(function(answer) {
    if (answer.userShop) {
      console.log(" ");
      customerPurchase();
    } else {
      connection.end();
    }
  });
}

// useful functions **********************************************************************************************

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
    function (err, res) {
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      getProducts();
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
    function (err, res) {
      console.log(res.affectedRows + " products deleted!\n");
      // Call readProducts AFTER the DELETE completes
      //readProducts();
    }
  );
}
