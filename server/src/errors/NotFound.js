class NotFound extends Error {  
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    this.code = 404
    this.status = 'Not Found'

    Error.captureStackTrace(this, this.constructor);
  }
  statusCode() {
    return this.status
  }
}

module.exports = NotFound