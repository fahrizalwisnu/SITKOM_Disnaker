// const { setQueryPagination } = require('../helper/modulePartials')
const { successGet } = require('../helper/responseApi')
const { Pelatihan, Peserta, User } = require('../models')

module.exports = {
  async getDataDashboard(req, res) {
    try {
      let { trainerId } = req.query
      let totalTrainers
      let totalParticipants
      let totalComplaints = 0
      let totalTrainings
      if (trainerId !== 'undefined') {
        totalTrainings = await Pelatihan.count({
          where: {
            trainerId
          }
        })
      } else {
        totalTrainings = await Pelatihan.count()
      }

      totalTrainers = await User.count({
        where: {
          roleId: 3
        }
      })

      totalParticipants = await Peserta.count()

      const responseData = {
        totalTrainers,
        totalTrainings,
        totalParticipants,
        totalComplaints
      }

      res.send(successGet('Berhasil mendapatkan data', responseData))
    } catch (error) {
      res.status(500).send({
        error: error.message
      })
    }
  }
}
