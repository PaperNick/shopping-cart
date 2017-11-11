import $ from 'jquery';
import cartTemplate from './cart.template.hbs';
import CartModel from './cart.model';
import ProductModel from '../product/product.model';

class CartComponent {
  constructor(cartService) {
    this.cartService = cartService;
  }

  render() {
    let cart = this.cartService.getAll();

    cart.forEach((cartItem, itemIdex) => {
      cartItem.itemPrice = CartModel.itemPrice(cartItem.product, cartItem.quantity);
    });

    return cartTemplate({ cartItems: cart });
  }

  emitRender() {
    window.dispatchEvent(new Event('renderCart'));
  }

  initEventListeners() {
    $('.remove-cart-item').on('click', this.removeProductFromCart.bind(this));
  }

  removeProductFromCart(event) {
    event.preventDefault();

    let cartItemIndex = $(event.target).attr('data-cart-item-id');
    let cart = new CartModel(this.cartService.getAll());

    cart.removeProduct(cartItemIndex);
    this.cartService.save(cart);
    this.emitRender();
  }
}

export default CartComponent;
