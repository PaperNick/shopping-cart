class ProductService {
  constructor() {
    this.products = localStorage.getItem('productList') ? JSON.parse(localStorage.getItem('productList')) : [];
  }

  getAll() {
    return JSON.parse(localStorage.getItem('productList'));
  }

  findById(productId) {
    return this.products.find(p => p.id == productId);
  }

  save(product) {
    if (!product.id) {
      product.id = this.getLastProductId();
      product.id = product.id + 1;
      this.products.push(product);
    } else {
      let productIndex = this.getAll().findIndex(p => p.id == product.id);
      this.products[productIndex] = product;
    }

    localStorage.setItem('productList', JSON.stringify(this.products));

    return product;
  }

  delete(productId) {
    let productIndex = this.getAll().findIndex(p => p.id == productId);

    this.products.splice(productIndex, 1);
    localStorage.setItem('productList', JSON.stringify(this.products));
  }

  getLastProductId() {
    if (this.products.length > 0) {
      return this.products[this.products.length -1].id;
    }

    return 0;
  }
}

export default ProductService;
