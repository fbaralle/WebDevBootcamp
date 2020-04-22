console.log("hello from listProducts.js app");
console.log("==========================");
console.log("=== WELCOME TO MY SHOP ===");
console.log("==========================");


var faker= require("faker");

for (i = 0; i < 10; i++) {
	var randomProd = faker.commerce.productName();
	var randomPrice = faker.commerce.price();
	var str = "Product: " + randomProd + "\t- price: $ " + randomPrice;
	console.log(str);
}

