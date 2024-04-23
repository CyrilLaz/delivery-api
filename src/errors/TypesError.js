class TypesError extends Error {
  constructor(message) {
    super(message);
    this.name = "TypesError";
    this.statusCode = 400;
  }
}

module.exports = TypesError;