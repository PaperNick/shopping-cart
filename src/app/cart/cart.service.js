class CartService {
  constructor() {
    this.cart = localStorage.getItem('cart') || [];
  }

  getAll() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  save(cart) {
    this.cart = cart;
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clear() {
    this.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}

export default CartService;
