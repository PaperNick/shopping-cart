class CartService {
  constructor() {
    this.cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    // Init localStorage
    if (this.cart.length === 0) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }

  getAll() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  save(cart) {
    this.cart = cart;
    localStorage.setItem('cart', JSON.stringify(this.cart.content));
  }

  clear() {
    this.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}

export default CartService;
