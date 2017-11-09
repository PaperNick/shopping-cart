import 'bootstrap';
import 'src/assets/styles/main.css';
import AppComponent from './app.component';
import ProductComponent from './product/product.component';
import ProductService from './product/product.service';

let productService = new ProductService();

let appComponent = new AppComponent(productService);
appComponent.init();

let productComponent = new ProductComponent(productService);
document.querySelector('.main').innerHTML = productComponent.render();
productComponent.initEventListeners();

// Handle dynamic triggers for render
window.addEventListener('render', (event) => {
  document.querySelector('.main').innerHTML = event.detail;
  productComponent.initEventListeners();
}, false);