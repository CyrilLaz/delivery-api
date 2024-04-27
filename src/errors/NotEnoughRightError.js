class NotEnoughRightError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotEnoughRightError';
      this.statusCode = 403;
    }
  }
  
  module.exports = NotEnoughRightError;