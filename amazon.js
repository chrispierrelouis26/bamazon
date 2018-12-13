var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect();


connection.query("SELECT * FROM products", function (err, response) {
  if (err) throw err;
  console.log(response);
  inquirer.prompt([{
    type: 'input',
    name: 'option',
    message: "What type of product would you like to buy?"
     
  }
  ]).then(function (response) {
    console.log(response)
    connection.query("SELECT * FROM products WHERE product_name =?", response.option, function (err, result) {
      if (err) throw err;
      console.log(result);
      // var choice = result.options;
      console.log(result[0].stock_quantity);

      if(result[0].stock_quantity <= 0) {
        
        console.log("insuffient funds!");
      } else {
        console.log("not working");
      }
    
    })


});
})

// connection.end();


