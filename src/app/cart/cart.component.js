import $ from 'jquery';
import cartTemplate from './cart.template.hbs';
import CartModel from './cart.model';
import ProductModel from '../product/product.model';

class CartComponent {
  constructor(cartService) {
    this.cartService = cartService;
  }

  render() {
    let cart = new CartModel(this.cartService.getAll());

    cart.content.forEach((cartItem, itemIdex) => {
      cartItem.itemPrice = CartModel.itemPrice(cartItem.product, cartItem.quantity);
    });

    return cartTemplate({
      cartItems: cart.content,
      subtotal: cart.calculateSubtotal(),
      total: cart.calculateTotal(),
    });
  }

  emitRender() {
    window.dispatchEvent(new Event('renderCart'));
  }

  initEventListeners() {
    $('.remove-cart-item').on('click', this.removeProductFromCart.bind(this));
    $('#cart-checkout').on('click', this.clearCart.bind(this));
  }

  removeProductFromCart(event) {
    event.preventDefault();

    let cartItemIndex = $(event.target).attr('data-cart-item-id');
    let cart = new CartModel(this.cartService.getAll());

    cart.removeProduct(cartItemIndex);
    this.cartService.save(cart);
    this.emitRender();
  }

  clearCart(event) {
    event.preventDefault();
    this.cartService.clear();
    this.emitRender();
  }
}

export default CartComponent;
