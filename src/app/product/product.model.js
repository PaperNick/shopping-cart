class ProductModel {
  static get TITLE_MIN_LENGTH() { return 3; }
  static get TITLE_MAX_LENGTH() { return 250; }

  static get DESCRIPTION_MIN_LENGTH() { return 5; }
  static get DESCRIPTION_MAX_LENGTH() { return 500; }

  static get MAX_IMAGE_SIZE_IN_BYTES() { return 3 * 1024 * 1024; }

  static fromState(state) {
    return new ProductModel(
      state.id,
      state.title,
      state.description,
      state.image,
      state.imageSize,
      state.price
    );
  }

  constructor(id, title, description, image, imageSizeBytes, price) {
    this.id = id;
    this.setTitle(title);
    this.setDescription(description);
    this.setImage(image, imageSizeBytes);
    this.setImageSize(imageSizeBytes);
    this.setPrice(price);
  }

  getTitle() {
    return this.title;
  }

  setTitle(newTitle) {
    if (newTitle.length < this.constructor.TITLE_MIN_LENGTH) {
      throw { message: `Title must be at least ${this.constructor.TITLE_MIN_LENGTH} characters long.` };
    }

    if (newTitle.length >= this.constructor.TITLE_MAX_LENGTH) {
      throw { message: `Title cannot exceed ${this.constructor.TITLE_MAX_LENGTH} characters.` };
    }

    this.title = newTitle;
  }


  getDescription() {
    return this.description;
  }

  setDescription(newDescription) {
    if (newDescription.length < this.constructor.DESCRIPTION_MIN_LENGTH) {
      throw { message: `Description must be at least ${this.constructor.DESCRIPTION_MIN_LENGTH} characters long.` };
    }

    if (newDescription.length >= this.constructor.DESCRIPTION_MAX_LENGTH) {
      throw { message: `Description cannot exceed ${this.constructor.DESCRIPTION_MAX_LENGTH} characters.` };
    }

    this.description = newDescription;
  }


  getImage() {
    return this.image;
  }

  setImage(newImage) {
    // TODO: Check for mime-type
    this.image = newImage;
  }

  getImageSize() {
    return this.imageSize;
  }

  setImageSize(newImageSizeBytes) {
    if (Number(newImageSizeBytes) > this.constructor.MAX_IMAGE_SIZE_IN_BYTES) {
      let maxSizeInMB = this.constructor.MAX_IMAGE_SIZE_IN_BYTES / 1024 / 1024;
      throw { message: `Cannot upload image larger than ${maxSizeInMB} MB` };
    }

    this.imageSize = newImageSizeBytes;
  }


  getPrice() {
    return this.price;
  }

  setPrice(newPrice) {
    if (Number(newPrice) < 0) {
      throw { message: 'The price of the product cannot be a negative number.' };
    }

    this.price = newPrice;
  }
}

export default ProductModel;
