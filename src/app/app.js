import 'bootstrap';
import 'src/assets/styles/main.css';
import AppComponent from './app.component';
import ProductComponent from './product/product.component';
import CartComponent from './cart/cart.component';

import ProductService from './product/product.service';
import CartService from './cart/cart.service';


let productService = new ProductService();
let cartService = new CartService();

let appComponent = new AppComponent(productService);
appComponent.init();

let productComponent = new ProductComponent(productService, cartService);
let cartComponent = new CartComponent(cartService);


// Handle dynamic triggers for rendering
window.addEventListener('renderProducts', (event) => {
  document.querySelector('.main-products').innerHTML = productComponent.render();
  productComponent.initEventListeners();
}, false);

window.addEventListener('renderCart', (event) => {
  document.querySelector('.main-cart').innerHTML = cartComponent.render();
  // cartComponent.initEventListeners();
}, false);


// Set the main components for the page
window.dispatchEvent(new Event('renderProducts'));
window.dispatchEvent(new Event('renderCart'));
