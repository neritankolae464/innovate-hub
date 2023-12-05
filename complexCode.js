/**
 * Filename: complexCode.js
 * 
 * Description: This code is a simulation of a complex and sophisticated application
 * that manages a virtual store. It includes various modules and classes to handle product
 * inventory, shopping cart, user authentication, payment processing, and order management.
 */

// Product class to represent a product in the store
class Product {
  constructor(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

// Inventory module to manage the product inventory
const Inventory = (function() {
  const products = [];

  return {
    addProduct: function(product) {
      products.push(product);
    },

    removeProduct: function(id) {
      const index = products.findIndex(product => product.id === id);
      if (index !== -1) {
        products.splice(index, 1);
      }
    },

    getProduct: function(id) {
      return products.find(product => product.id === id);
    },

    getAllProducts: function() {
      return products;
    }
  };
})();

// Shopping cart module to handle the user's shopping cart
const ShoppingCart = (function() {
  const cart = [];

  return {
    addToCart: function(product) {
      if (product.quantity > 0) {
        const cartProduct = cart.find(item => item.product.id === product.id);
        if (cartProduct) {
          cartProduct.quantity++;
          product.quantity--;
        } else {
          cart.push({ product: product, quantity: 1 });
          product.quantity--;
        }
        console.log(`"${product.name}" added to cart.`);
      } else {
        console.log(`"${product.name}" is out of stock.`);
      }
    },

    removeFromCart: function(productId) {
      const cartProductIndex = cart.findIndex(item => item.product.id === productId);
      if (cartProductIndex !== -1) {
        const cartProduct = cart[cartProductIndex];
        cartProduct.product.quantity += cartProduct.quantity;
        cart.splice(cartProductIndex, 1);
        console.log(`Product removed from cart.`);
      }
    },

    getCartTotal: function() {
      return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
  };
})();

// User module to handle authentication and user-related operations
const User = (function() {
  let authenticatedUser = null;

  return {
    login: function(username, password) {
      // Check if the given credentials are valid
      // Simulating authentication with hardcoded values
      if (username === "admin" && password === "password") {
        authenticatedUser = username;
        console.log("Login successful.");
      } else {
        console.log("Invalid credentials.");
      }
    },

    logout: function() {
      authenticatedUser = null;
      console.log("Logout successful.");
    },

    isAuthenticated: function() {
      return authenticatedUser !== null;
    }
  };
})();

// PaymentGateway module to handle payment processing
const PaymentGateway = (function() {
  const paymentMethods = ["credit card", "debit card", "paypal", "google pay"];

  return {
    processPayment: function(total, paymentMethod) {
      if (User.isAuthenticated()) {
        if (paymentMethods.includes(paymentMethod)) {
          console.log(`Payment of $${total.toFixed(2)} processed successfully via ${paymentMethod}.`);
          return true;
        } else {
          console.log("Invalid payment method.");
        }
      } else {
        console.log("User not authenticated.");
      }
      return false;
    }
  };
})();

// Order module to manage user orders
const Order = (function() {
  const orders = [];

  return {
    placeOrder: function() {
      if (User.isAuthenticated()) {
        const cartTotal = ShoppingCart.getCartTotal();
        if (cartTotal > 0) {
          const order = { products: [...ShoppingCart.getCartContents()], total: cartTotal, date: new Date() };
          orders.push(order);
          console.log("Order placed successfully.");
          ShoppingCart.clearCart();
          return order;
        } else {
          console.log("Cart is empty. Add some products before placing an order.");
        }
      } else {
        console.log("User not authenticated.");
      }
      return null;
    },

    getOrders: function() {
      if (User.isAuthenticated()) {
        return orders;
      } else {
        console.log("User not authenticated.");
      }
      return [];
    }
  };
})();

// Main application code
console.log("Welcome to the Virtual Store!");

// Add sample products to the inventory
Inventory.addProduct(new Product(1, "Product 1", 9.99, 5));
Inventory.addProduct(new Product(2, "Product 2", 19.99, 10));
Inventory.addProduct(new Product(3, "Product 3", 14.99, 3));
Inventory.addProduct(new Product(4, "Product 4", 5.99, 8));
Inventory.addProduct(new Product(5, "Product 5", 24.99, 2));

// Login as admin
User.login("admin", "password");

// Perform actions
ShoppingCart.addToCart(Inventory.getProduct(1));
ShoppingCart.addToCart(Inventory.getProduct(2));
ShoppingCart.addToCart(Inventory.getProduct(2));
ShoppingCart.removeFromCart(2);

User.logout();

console.log(Order.placeOrder());
console.log(Order.getOrders());