const express = require('express')
const {
  createReport,
  getAllReport,
  getReportById,
  // updateReport,
  // deleteReport,
  // approveReport,
  // rejectReport
} = require('../controllers/ComplaintController.js')

// const { JWTMiddleware } = require('../middleware/JWTMiddleware.js')

const complaintRouter = express.Router()

complaintRouter.post('/', createReport)
complaintRouter.get('/', getAllReport)
complaintRouter.get('/:id', getReportById)
// complaintRouter.put('/:id', updateReport)
// complaintRouter.delete('/:id', deleteReport)
// complaintRouter.put('/approve/:id', approveReport)
// complaintRouter.put('/reject/:id', rejectReport)

module.exports = complaintRouter
