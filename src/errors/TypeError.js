class TypeError extends Error {
  constructor(message) {
    super(message);
    this.name = "TypeError";
    this.statusCode = 400;
  }
}

module.exports = TypeError;