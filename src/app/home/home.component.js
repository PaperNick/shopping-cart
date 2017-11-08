class Home {
  constructor(salutation) {
    this.salutation = salutation;
  }

  render() {
    return require('./home.html');
  }
}

export default Home;