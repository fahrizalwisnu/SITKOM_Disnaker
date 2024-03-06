const express = require('express')
const {
  createReport,
  getAllUsersTrainings,
  getAllUsersYellowCards,
  getReportById,
  updateReport,
  deleteReport,
  approveReport,
  rejectReport
} = require('../controllers/UserProfileController.js')

// const { JWTMiddleware } = require('../middleware/JWTMiddleware.js')

const userProfileRouter = express.Router()

userProfileRouter.post('/', createReport)
userProfileRouter.get('/trainings/:userId', getAllUsersTrainings)
userProfileRouter.get('/yellowcards/:userId', getAllUsersYellowCards)
userProfileRouter.get('/:id', getReportById)
userProfileRouter.put('/:id', updateReport)
userProfileRouter.delete('/:id', deleteReport)
userProfileRouter.put('/approve/:id', approveReport)
userProfileRouter.put('/reject/:id', rejectReport)

module.exports = userProfileRouter
