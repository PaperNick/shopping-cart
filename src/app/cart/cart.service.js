class CartService {
  constructor() {
    this.products = localStorage.getItem('cartContent') || [];
  }

  add(product, quantity) {
    // TODO: if product with the same id is passed, update quantity only
    this.products.push(product);
    localStorage.setItem('cartContent', this.products);
  }

  remove(product) {
    // Pseudo code, use searching for product.id instead
    let productIndex = this.products.indexOf(product);

    if (productIndex === -1) {
      throw { message: 'Could not find the given product in the cart' };
    }

    this.products.splice(productIndex, 1);
  }

  clear() {
    this.products = [];
    localStorage.setItem('cartContent', []);
  }
}

export default CartService;
