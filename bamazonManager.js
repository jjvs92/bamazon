var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("working");
    viewOptions();

})

function viewOptions (){
    inquirer.prompt([{
        type: "list",
        name: "whatCommand",
        message:"What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]

    }]).then(function(user){
        console.log(user.whatCommand);
        var toDo = user.whatCommand;

        if(toDo === "View Products for Sale"){
            console.log("working");
            viewProducts();
            
        }else if(toDo === "View Low Inventory"){
            viewLowInventory();
        }else if(toDo === "Add to Inventory"){
            addToInventory();
        }else if(toDo === "Add New Product"){
            addNewProduct();
        }else if(toDo === "Quit"){
            connection.end();
        }
           
            
        
    })
    // connection.end();
}

function viewProducts(){
    connection.query("select * from products", function(err,res){
        if (err) throw err;
        console.log("ID  Product  Price  Quantity");
        for(var i = 0; i < res.length; i++){
            console.log(res[i].item_id+ "  " + res[i].product_name + "   " + res[i].price + "$  " + res[i].stock_quantity);
        }
        viewOptions();
    })   
}

function viewLowInventory(){
    connection.query("select * from products where stock_quantity < 5", function(err,res){
        if (err){
            console.log("No products in low inventory");
        }else{
            console.log("LOW INVENTORY\n Product  Quantity");
            for(var i=0; i< res.length; i++){
                console.log(res[i].item_id + "  " + res[i].product_name + "  " + res[i].stock_quantity);
            }
        }
        viewOptions();
    })
}

function addToInventory(){
    inquirer.prompt([{
        type: "input",
        name: "addToWhat",
        message: "Which item would you like to update"
    },{
        type:"input",
        name: "howManyAdded",
        message: "How many would you like to add?"
    }
]).then(function(input){
    var userAdded= input.howManyAdded;
    userAdded = parseInt(userAdded);
    var userID = input.addToWhat;
    connection.query("select * from products where?", {item_id: userID}, function(err,res){
        if(err) throw err;
        // console.log(res);
        var quantity = res[0].stock_quantity + userAdded;
        console.log(quantity);
        connection.query("update products set ? where?",[{stock_quantity: quantity},{item_id: userID}],function(err,res){
            if(err) throw err;
            console.log(res.affectedRows);
        })
        viewOptions();
    })

})}

function addNewProduct(){
    inquirer.prompt([{
        type: "input",
        name: "newProduct",
        message: "What product would you like to add?"
    },{
        type: "input",
        name: "newDepartment",
        message: "What department does this product belong in?"
    },{
        type: "input",
        name: "newPrice",
        message: "How much does this product cost?"
    },{
        type: "input",
        name: "newQuantity",
        message: "How much do we have in stock?"
    }]).then(function(input){
        connection.query("insert into products set ?",
        {
            product_name: input.newProduct,
            department_name: input.newDepartment,
            price: input.newPrice,
            stock_quantity: input.newQuantity
        },
        function(err,res){
            if(err) throw err;
            console.log(res.affectedRows);
            viewProducts();
        })
    })
}