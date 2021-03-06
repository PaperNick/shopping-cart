import $ from 'jquery';
import productsPage from './product.template.hbs';
import ProductModel from './product.model';
import CartModel from '../cart/cart.model';

class ProductComponent {
  constructor(productService, cartService) {
    this.productService = productService;
    this.cartService = cartService;
  }

  render() {
    return productsPage(
      { products: this.productService.getAll() }
    );
  }

  emitRender() {
    window.dispatchEvent(new Event('renderProducts'));
  }

  initEventListeners() {
    $('#new-product-image, #edit-product-image').on('change', function () {
      if (this.files && this.files[0]) {
        let file = this.files[0];
        let fileReader = new FileReader();

        fileReader.addEventListener('load', (event) => {
          $(this).attr('value', event.target.result)
          $(this).attr('data-image-size', file.size);
        });

        fileReader.readAsDataURL(this.files[0]);
      }
    });

    $('#new-product-form').on('submit', this.createProduct.bind(this));
    $('.remove-product').on('click', this.deleteProduct.bind(this));
    $('.edit.glyphicon-pencil').on('click', this.openEditModal.bind(this));
    $('#edit-product-form').on('submit', this.editProduct.bind(this));
    $('.add-product-to-cart-form').on('submit', this.addToCart.bind(this));
  }

  createProduct(event) {
    event.preventDefault();

    try {
      let formData = $('#new-product-form').serializeArray();
      let $image = $('#new-product-image');

      let title = formData[0].value;
      let description = formData[1].value;
      let image = $image.attr('value');
      let imageSize = $image.attr('data-image-size');
      let price = formData[2].value;

      let product = new ProductModel(null, title, description, image, imageSize, price);
      this.productService.save(product);

      $('#new-product-modal').modal('hide');
      this.emitRender();
    } catch (error) {
      alert(error.message);
    }

  }

  deleteProduct(event) {
    event.preventDefault();

    let productId = $(event.target).attr('data-product-id');
    this.productService.delete(productId);
    this.emitRender();
  }

  openEditModal(event) {
    event.preventDefault();

    let productId = $(event.target).attr('data-product-id');
    let product = ProductModel.fromState(this.productService.findById(productId));

    $('#edit-product-id').attr('value', product.id);
    $('#edit-product-title').attr('value', product.getTitle());
    $('#edit-product-description').attr('value', product.getDescription());
    $('#edit-product-image').attr('value', product.getImage());
    $('#edit-product-image').attr('data-image-size', product.getImageSize());
    $('#edit-product-price').attr('value', product.getPrice());
  }

  editProduct(event) {
    event.preventDefault();

    try {
      let formData = $('#edit-product-form').serializeArray();
      let $image = $('#edit-product-image');

      let id = formData[0].value;
      let title = formData[1].value;
      let description = formData[2].value;
      let image = $image.attr('value');
      let imageSize = $image.attr('data-image-size');
      let price = formData[3].value;

      let product = new ProductModel(id, title, description, image, imageSize, price);
      this.productService.save(product);

      $('#edit-product-modal').modal('hide');
      this.emitRender();
      window.dispatchEvent(new CustomEvent('productEdited', { detail: product }));
    } catch (error) {
      alert(error.message);
    }
  }

  addToCart(event) {
    event.preventDefault();

    let productId = $(event.target).attr('data-product-id');
    let product = ProductModel.fromState(this.productService.findById(productId));

    let productFormData = $(event.target).serializeArray();
    let productQuantity = productFormData[0].value;

    try {
      let cart = new CartModel(this.cartService.getAll());
      cart.addProduct(product, productQuantity);
      this.cartService.save(cart);
      window.dispatchEvent(new Event('renderCart'));
    } catch (error) {
      alert(error.message);
    }
  }

}

export default ProductComponent;