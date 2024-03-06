const Op = require('sequelize').Op

module.exports = {
  /**
   * @desc Convert request to query database
   * @param {*} req 
   * @param {[string]} columnNames 
   * @returns 
   */
  setQueryPagination(req, columnNames = [] ) {
    let { search } = req.query,
      sortBy = req.query.sortBy || 'id',
      sortDesc = req.query.sortDesc == 'true' ? 'ASC' : 'DESC'

    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    limit = limit == -1 ? null : limit

    const offset = (page - 1) * limit

    const where = columnNames.length > 1 ? {
      [Op.or]: columnNames.map(columnName => ({
        [columnName]: { [Op.like]: `%${search}%` },
      })),
    } : null

    return {
      page,
      limit,
      offset,
      sortBy,
      sortDesc,
      where
    }
  },

  /**
   * 
   * @param {object} results 
   * @param {number} page 
   * @param {number} limit 
   * @returns   
   */
  getPagingData(results, page, limit) {
    const { count: total, rows: data } = results
    const totalPages = Math.ceil(total / limit)

    return {
      data,
      pageData: {
        size: limit,
        total,
        totalPages,
        current: page
      }
    }
  }
}
