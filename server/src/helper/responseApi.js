/**
 * @desc    Send any success response for get data
 *
 * @param   {string} message
 * @param   {object | array} data
 */
exports.successGet = (message, data) => {
  return {
    message,
    code: 200,
    status: 'OK',
    data
  }
}

exports.successPagination = (tableName, data, page) => {
  return {
    message: `Data ${tableName} ditemukan`,
    code: 200,
    status: 'Ok',
    data,
    page
  }
}

/**
 * @desc    Send any error response
 *
* @param   {number} code
* @param   {string} status
* @param   {object} errors
* @param   {string} message
 */
exports.errorResponse = (code, status, message) => {
  return {
    code,
    status,
    message
  }
}

/**
 * @desc    Send any validation response
 *
 * @param   {object} errors
 */
exports.validationResponse = (errors) => {
  return {
    // message: 'Validation errors',
    code: 400,
    status: 'BAD_REQUEST',
    errors
  }
}

/**
 * 
 * @param {string} errors 
 * @returns 
 */

exports.notFound = (errors) => {
  return {
    code: 404,
    status: 'Not Found',
    errors
  }
}