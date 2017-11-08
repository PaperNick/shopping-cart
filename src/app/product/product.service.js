class ProductService {
  constructor() {
    this.products = localStorage.getItem('productList') || [];
    this.lastProductId = localStorage.getItem('lastProductId') || 0;
  }

  findById(productId) {
    return this.products.find(p => p.id === productId);
  }

  save(product) {
    if (!product.id) {
      product.id = ++this.lastProductId;
    }

    this.products.push(product);

    localStorage.setItem('productList', this.products);
    localStorage.setItem('lastProductId', this.lastProductId);
  }
}

export default ProductService;
