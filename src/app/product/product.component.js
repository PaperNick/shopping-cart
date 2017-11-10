import $ from 'jquery';
import productsPage from './product.template.hbs';
import ProductModel from './product.model';

class ProductComponent {  
  constructor(productService) {
    this.productService = productService;
  }

  render() {
    return productsPage(
      { products: this.productService.getAll() }
    );
  }

  initEventListeners() {
    $('#new-product-image').on('change', function () {
      if (this.files && this.files[0]) {
        let file = this.files[0];
        let fileReader = new FileReader();

        fileReader.addEventListener('load', function (event) {
          $('#new-product-image-preview').attr('src', event.target.result);
          $('#new-product-image-preview').attr('data-image-size', file.size);
        });

        fileReader.readAsDataURL(this.files[0]);
      }
    });

    $('#new-product-form').on('submit', this.createProduct.bind(this));
    $('.remove-product').on('click', this.deleteProduct.bind(this));
    $('.edit.glyphicon-pencil').on('click', this.openEditModal.bind(this));
    $('#edit-product-form').on('submit', this.editProduct.bind(this));
  }

  createProduct(event) {
    event.preventDefault();
    
    try {
      let formData = $('#new-product-form').serializeArray();
      let $image = $('#new-product-image-preview');

      let title = formData[0].value;
      let description = formData[1].value;
      let image = $image.attr('src');
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
    let product = this.productService.findById(productId);

    $('#edit-product-id').attr('value', product.id);
    $('#edit-product-title').attr('value', product.title);
    $('#edit-product-description').attr('value', product.description);
    $('#edit-product-image').attr('value', product.image);
    $('#edit-product-image-preview').attr('src', product.image);
    $('#edit-product-price').attr('value', product.price);
  }

  emitRender() {
    let renderEvent = new CustomEvent('render', { detail: this.render() });
    window.dispatchEvent(renderEvent);
  }

  editProduct(event) {
    event.preventDefault();

    try {
      let formData = $('#edit-product-form').serializeArray();
      let $image = $('#edit-product-image-preview');

      let id = formData[0].value;
      let title = formData[1].value;
      let description = formData[2].value;
      let image = $image.attr('src');
      let imageSize = $image.attr('data-image-size');
      let price = formData[3].value;

      let product = new ProductModel(id, title, description, image, imageSize, price);
      this.productService.save(product);

      $('#edit-product-modal').modal('hide');
      this.emitRender();
    } catch (error) {
      alert(error.message);
    }
  }

}

export default ProductComponent;