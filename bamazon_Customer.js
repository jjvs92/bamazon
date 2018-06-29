var mysql = require("mysql");
var inquirer = require("inquirer");
var cost = 0;

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function(err){
    if(err) throw err;
    displayItems();
})

function displayItems(){
    connection.query("select item_id, product_name, price from products", function(err, res){
        if(err) throw err;
        // console.log(res[1].item_id);
        for(var i = 0; i < res.length; i++){
            console.log(res[i].item_id + "   " + res[i].product_name + "   " + res[i].price + "$");
        }
        whatProduct();
    })
   
}

function whatProduct(){
    inquirer.prompt([{
        type: "input",
        name: "what_item",
        message: "Please enter the ID of the product you would like to purchase"
    },{
        type: "input",
        name: "how_many",
        message: "How many would you like to buy?"}
    ]).then(function(user){
        var userChoice = user.what_item;
        var howMany = user.how_many;

        if (userChoice <= 10){
        connection.query("select * from products WHERE ?", {item_id: userChoice}, function(err, res){
            if(err) throw err;

                if(howMany > res[0].stock_quantity){
                console.log("We do not have enough to complete this order.");
                whatProduct();
                }else{
                cost = howMany * res[0].price;
                var amountLeft = res[0].stock_quantity - howMany;
                updateData(amountLeft, userChoice);
                

                console.log("Thank you for shopping at Bamazon, your total is " + cost);
                connection.end();
                }
            
        })}else  {
            console.log("Please select an item on the list")
            displayItems();
        }
    })}

    function updateData(amountLeft, userChoice){
        connection.query("UPDATE products set ? where ?", 
            [
                {
                    stock_quantity: amountLeft,
                },{
                    item_id: userChoice,
                }], function(err,res){
                    if(err) throw err;
                    // console.log(res.affectedRows);
                });
    }