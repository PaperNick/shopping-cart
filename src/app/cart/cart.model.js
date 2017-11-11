class CartModel {

  /**
   * [
   *   { product - Object, quantity - Number }
   *   ...
   * ]
   */
  constructor(content) {
    this.content = content;
  }

  addProduct(product, quantity) {
    let existingCartItemIndex = this.content.findIndex(item => item.product.id == product.id);

    if (existingCartItemIndex === -1) {
      this.content.push({ product, quantity });
    } else {
      this.content[existingCartItemIndex].quantity = this.content[existingCartItemIndex].quantity + quantity;
    }
  }

  removeProduct(product) {
    let existingCartItemIndex = this.content.findIndex(item => item.product.id == product.id);

    if (existingCartItemIndex === -1) {
      throw { message: 'Could not find the given product in the cart' };
    }

    this.content.splice(existingCartItemIndex, 1);
  }

  calculateTotal() {
    let subtotal = this.calculateSubtotal();

    return subtotal + this.getShippingFee(subtotal);
  }

  calculateSubtotal() {
    if (this.content.length === 0) {
      return 0;
    }

    let productsPrice = this.content
      .map(item => item.product.price * item.quantity)
      .reduce((previous, current) => previous + current);
    
    return productsPrice;
  }

  getShippingFee(productsPrice) {
    return productsPrice * 0.05;
  }
}

export default CartModel;
