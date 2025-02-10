Shopping Cart

Overview:
This is a simple shopping cart implementation in JavaScript that integrates with a price API to fetch product prices dynamically. The cart allows users to add products, compute totals (including tax), and display the cart state.

Installation

Clone the repository:

git clone https://github.com/mahesh1723/ShoppingCart.git
cd shopping-cart-assignment

Install dependencies: npm install

Start the Price API server: npm run serve-products

Run the shopping cart script: node shoppingCart.js

Testing the Solution

The reviewer can test the solution using the following steps:

Run the script: Ensure the Price API server is running (npm run serve-products), then execute: node shoppingCart.js

This should output a summary of the cart with product details and totals.

Modify the input: Edit shoppingCart.js to add different products with varying quantities and rerun the script.

Check for API response: Use curl to manually test the API response:

curl http://localhost:3001/products/cornflakes

This should return a JSON object with the price of cornflakes.

Run unit tests: npm test

This will execute the built-in tests to verify cart functionality, such as adding products and computing totals correctly.

Assumptions

The price API is always available and running on localhost:3001.

The API returns correct price data in JSON format.

Prices are stored in cents and converted to dollars when displayed.