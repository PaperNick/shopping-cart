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
    if (Number(quantity) <= 0) {
      throw { message: 'The quantity of a product cannot be less than or equal to 0.'};
    }

    let existingCartItemIndex = this.content.findIndex(item => item.product.id == product.id);

    if (existingCartItemIndex === -1) {
      this.content.push({ product, quantity });
    } else {
      this.content[existingCartItemIndex].quantity = Number(this.content[existingCartItemIndex].quantity) + Number(quantity);
    }
  }

  removeProduct(cartItemIndex) {
    this.content.splice(cartItemIndex, 1);
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
      .map(item => Number(item.product.price) * Number(item.quantity))
      .reduce((previous, current) => Number(previous) + Number(current));
    
    return productsPrice;
  }

  getShippingFee(productsPrice) {
    return Number(productsPrice) * 0.05;
  }

  static itemPrice(product, quantity) {
    return Number(product.price) * Number(quantity);
  }
}

export default CartModel;
