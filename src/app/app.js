import 'bootstrap';
import 'src/assets/styles/main.css';
import AppComponent from './app.component';
import ProductComponent from './product/product.component';
import ProductService from './product/product.service';

let productService = new ProductService();

let appComponent = new AppComponent(productService);
appComponent.init();

let productComponent = new ProductComponent(productService);

// Handle dynamic triggers for rendering
window.addEventListener('renderProducts', (event) => {
  document.querySelector('.main').innerHTML = event.detail;
  productComponent.initEventListeners();
}, false);

// Set the main component for the page
let renderProductsEvent = new CustomEvent('renderProducts', { detail: productComponent.render() });
window.dispatchEvent(renderProductsEvent);