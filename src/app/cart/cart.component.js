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
    let renderEvent = new CustomEvent('renderCart', { detail: this.render() });
    window.dispatchEvent(renderEvent);
  }
}

export default CartComponent;
