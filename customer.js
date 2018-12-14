var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start(){
    inquirer.prompt([
        {
            type: "list",
            name: "customerPick",
            message: "Would you like to look or buy?",
            choices: ["I'd like to look first!", "I'm ready to make a purchase"]
        },
    ]).then(function(customerResponse){
        var customerPick = customerResponse.customerPick;
        if(customerPick ==="I'd like to look first!"){
            connection.query("SELECT * FROM products;", function(err, res){
                console.table(res);
                start();
            });
        } else if (customerPick === "I'm ready to make a purchase"){
            inquirer.prompt([
                {
                    name: "idInput",
                    message: "What is the item ID youd like to purchase?",
                    validate: function validateidInput(name){
                        return name !== '';
                    }
                },
                {
                    name: "customer",
                    message: "How much would you like to purchase?",
                    validate: function validatecustomer(name){
                        return name !== '';
                    }
                }
            ]).then(function(answer){
                connection.query("SELECT stock_quantity FROM products WHERE item_id= ?", [answer.idInput],function(err, res){
                    if (answer.customer > res[0].stock_quantity){
                        console.log("Insufficient quantity!");
                        start();
                    } else if (answer.customer <= res[0].stock_quantity){
                        console.log("Your order has been placed, Thank you come again!");
                        connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [(res[0].stock_quantity - answer.customer),answer.idInput], function(err, res){
                            connection.end();
                        })
                    }   
                })
            })
        }
    })
}