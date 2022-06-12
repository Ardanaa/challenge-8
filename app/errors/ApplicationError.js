class ApplicationError extends Error {
  constructor() {
    super("Error!");
  }
  get details() {
    return {};
  }

  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        details: this.details
      }
    }
  }
}

module.exports = ApplicationError;
