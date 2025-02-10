//shopping Cart assignment 

const axios = require('axios'); //for making HTTP request

class ShoppingCart {
    constructor() {
        this.cart = new Map(); // Store product names and quantities
        this.prices = new Map(); // Cache for product prices
        this.taxRate = 0.125; // defining 12.5% as tax
        this.apiBaseUrl = 'http://localhost:3001/products/'; //Url for fetching product price
    }

    async addProduct(productName, quantity = 1) {
        productName = productName.toLowerCase(); //converting product name to lowercase for conssistency 
        if (!this.cart.has(productName)) { //initalize the quantity of the product
            this.cart.set(productName, 0); 
        }
        this.cart.set(productName, this.cart.get(productName) + quantity); //increase the quantity of the product

        if (!this.prices.has(productName)) { //fetching price only if it's not already saved
            try {
                const response = await axios.get(`${this.apiBaseUrl}${productName}`); //feching price from API
                this.prices.set(productName, response.data.price); //store price
            } catch (error) {
                console.error(`Error fetching price for ${productName}:`, error.message); //error if API fails
            }
        }
    }

    calculateTotals() {
        let subtotal = 0; 
        for (const [product, quantity] of this.cart.entries()) {
            if (this.prices.has(product)) {
                subtotal += this.prices.get(product) * quantity;
            }
        }
        const tax = Math.round(subtotal * this.taxRate * 100) / 100;
        const total = Math.round((subtotal + tax) * 100) / 100;
        return { subtotal, tax, total }; //return the computed values
    }

    getCartState() {
        const cartItems = {}; // Initialize an object to store cart items
        for (const [product, quantity] of this.cart.entries()) { // Loop through cart
            cartItems[product] = quantity; // Store product and quantity in object
        }
        const totals = this.calculateTotals(); // Compute totals
        return {
            items: cartItems,
            subtotal: totals.subtotal,
            tax: totals.tax,
            total: totals.total
        }; // Return the cart state
    }

    displayCart() {
        console.log('Shopping Cart:'); // Display Shopping Cart
        for (const [product, quantity] of this.cart.entries()) {
            console.log(`${quantity} × ${product}`);
        }
        const totals = this.calculateTotals();
        console.log(`Subtotal: $${totals.subtotal}`);
        console.log(`Tax: $${totals.tax}`);
        console.log('--------------------')
        console.log(`Total: $${totals.total}`); //Display total amount
        console.log('Please Visit Again');
    }
}

// Example Usage
(async () => {
    const cart = new ShoppingCart();
    await cart.addProduct('cornflakes', 1);
    await cart.addProduct('cornflakes', 1);
    await cart.addProduct('weetabix', 1);
    cart.displayCart();
})();

module.exports = ShoppingCart;


if (require.main === module) {
    (async () => {
        const cart = new ShoppingCart();
        await cart.addProduct('cornflakes', 2);
        await cart.addProduct('weetabix', 1);

        console.log('\nRunning Tests...');
        console.assert(cart.cart.get('cornflakes') === 2, 'Test Failed: Cornflakes quantity should be 2');
        console.assert(cart.cart.get('weetabix') === 1, 'Test Failed: Weetabix quantity should be 1');

        const totals = cart.calculateTotals();
        console.assert(totals.subtotal >= 0, 'Test Failed: Subtotal should be a positive number');
        console.assert(totals.tax >= 0, 'Test Failed: Tax should be a positive number');
        console.assert(totals.total >= 0, 'Test Failed: Total should be a positive number');

        console.log('Cart State:', cart.getCartState()); //Display cart state
        console.log('All Tests Passed!');
    })();
}
