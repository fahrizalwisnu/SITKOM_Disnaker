const express = require('express')

const {
  createYellowCard,
  getAllYellowCard,
  getYellowCardById,
  updateYellowCard,
  deleteYellowCard,
  approveYellowCard,
  rejectYellowCard
} = require('../controllers/KartuKuningController.js')

// const { JWTMiddleware } = require('../middleware/JWTMiddleware.js')
// const { roleAccess } = require("../middleware/RoleAccessMiddleware.js")

const yellowCardRouter = express.Router()

yellowCardRouter.post('/', createYellowCard)
yellowCardRouter.get('/', getAllYellowCard)
yellowCardRouter.get('/:id', getYellowCardById)
yellowCardRouter.put('/:id', updateYellowCard)
yellowCardRouter.delete('/:id', deleteYellowCard)
yellowCardRouter.put('/approve/:id', approveYellowCard)
yellowCardRouter.put('/reject/:id', rejectYellowCard)

module.exports = yellowCardRouter
