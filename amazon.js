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


    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
    });


      
    inquirer.prompt([{
        type: 'list',
        name: 'option',
        message: "What type of product would you like to buy?",
        choices:["Yes", "No"]
     }
    ]).then(function (response){
       console.log(response.choices)
    });

  


    connection.end();


  