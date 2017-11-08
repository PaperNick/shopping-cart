class ProductModel {
  static get TITLE_MIN_LENGTH() { return 3; }
  static get TITLE_MAX_LENGTH() { return 250; }

  static get DESCRIPTION_MIN_LENGTH() { return 5; }
  static get DESCRIPTION_MAX_LENGTH() { return 500; }


  constructor(id, title, description, image, price) {
    this.id = id;
    this.title = title;
    this.description = this.description;
    this.image = image;
    this.price = price;
  }

  get title() {
    return this.title;
  }

  set title(newTitle) {
    if (newTitle.length < this.constructor.TITLE_MIN_LENGTH) {
      throw { message: `Title must be at least ${this.constructor.TITLE_MIN_LENGTH} characters long.` };
    }

    if (newTitle.length >= this.constructor.TITLE_MAX_LENGTH) {
      throw { message: `Title cannot exceed ${this.constructor.TITLE_MAX_LENGTH} characters.` };
    }

    this.title = newTitle;
  }


  get description() {
    return this.description;
  }

  set description(newDescription) {
    if (newDescription.length < this.constructor.DESCRIPTION_MIN_LENGTH) {
      throw { message: `Description must be at least ${this.constructor.DESCRIPTION_MIN_LENGTH} characters long.` };
    }

    if (newDescription.length >= this.constructor.DESCRIPTION_MAX_LENGTH) {
      throw { message: `Description cannot exceed ${this.constructor.DESCRIPTION_MAX_LENGTH} characters.` };
    }

    this.description = newDescription;
  }


  get image() {
    return this.image;
  }

  set image(newImage) {
    // Check for mime-type
    this.image = image;
  }


  get price() {
    return this.price;
  }

  set price(newPrice) {
    if (newPrice < 0) {
      throw { message: 'The price of the product cannot be a negative number.' };
    }

    this.price = newPrice;
  }
}

export default ProductModel;
