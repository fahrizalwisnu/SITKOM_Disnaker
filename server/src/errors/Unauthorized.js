class Unauthorized extends Error {  
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    this.code = 401
    this.status = 'Unauthorized'

    Error.captureStackTrace(this, this.constructor);
  }
  statusCode() {
    return this.status
  }
}

module.exports = Unauthorized