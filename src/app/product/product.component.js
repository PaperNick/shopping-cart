import $ from 'jquery';
import productsPage from './product.template.hbs';
import ProductModel from './product.model';

class ProductComponent {
  // TODO move this constant in ProductModel
  static get MAX_IMAGE_SIZE_IN_BYTES() { return 3 * 1024 * 1024; }

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
  }

  createProduct(event) {
    event.preventDefault();
    let $image = $('#new-product-image-preview');

    if (Number($image.attr('data-image-size')) > this.constructor.MAX_IMAGE_SIZE_IN_BYTES) {
      let maxSizeInMB = this.constructor.MAX_IMAGE_SIZE_IN_BYTES / 1024 / 1024;
      alert(`Cannot upload image larger than ${maxSizeInMB} MB`);
      return;
    }

    try {
      let formData = $('#new-product-form').serializeArray();
      let title = formData[0].value;
      let description = formData[1].value;
      let image = $image.attr('src');
      let price = formData[2].value;

      let product = new ProductModel(null, title, description, image, price);
      this.productService.save(product);

      $('#new-product-modal').modal('hide');
      let renderEvent = new CustomEvent('render', { detail: this.render() });
      window.dispatchEvent(renderEvent);
    } catch (error) {
      alert(error.message);
    }

  }

  deleteProduct(event) {
    let productId = $(event.target).attr('data-product-id');
    this.productService.delete(productId);
    let renderEvent = new CustomEvent('render', { detail: this.render() });
    window.dispatchEvent(renderEvent);
  }

}

export default ProductComponent;