const jwt = require('jsonwebtoken')
const { Peserta, User, Jadwal, Pelatihan } = require('../models')
const config = require('../config/config')
const {
  setQueryPagination,
  getPagingData
} = require('../helper/modulePartials')
const { successPagination } = require('../helper/responseApi')

function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      req.cookies.token,
      config.authentication.jwtSecret,
      // {},
      async (err, userData) => {
        if (err) {
          reject(err)
        }
        resolve(userData)
      }
    )
  })
}

module.exports = {
  async applyPeserta(req, res) {
    try {
      const userData = await getUserDataFromToken(req)
      const { jadwalId } = req.params

      let peserta = await Peserta.findOne({
        where: {
          userId: userData.id,
          jadwalId
        }
      })

      if (peserta) {
        return res.status(400).send({
          message: 'Anda sudah terdaftar di pelatihan ini'
        })
      }

      const pesertaApply = await Peserta.create({
        userId: userData.id,
        jadwalId
      })

      console.log('peserta', pesertaApply)

      res.send({
        message: 'Berhasil mendaftar pelatihan',
        data: pesertaApply
      })
    } catch (error) {
      res.status(500).send({
        message: error.message
      })
    }
  },

  async getApply(req, res) {
    const userData = await getUserDataFromToken(req)
    const { jadwalId } = req.params

    const pesertaApply = await Peserta.findOne({
      where: {
        userId: userData.id,
        jadwalId
      }
    })

    res.send({
      message: 'already applied',
      data: pesertaApply
    })
  },

  async getPesertaPelatihan(req, res) {
    try {
      const { id } = req.params

      const peserta = await Peserta.findAll({
        where: {
          jadwalId: id
        }
      })

      if (!peserta) {
        return res.status(401).send({
          message: 'Data peserta pelatihan kosong'
        })
      }

      res.send({
        message: 'success',
        data: peserta
      })
    } catch (error) {
      res.status(501).send({
        message: error.message
      })
    }
  },

  async getAllPeserta(req, res) {
    try {
      const {
        page,
        limit,
        offset,
        sortBy,
        sortDesc,
        where
      } = setQueryPagination(req)
      // const { id } = req.params

      const pesertaDoc = await Peserta.findAndCountAll({
        where,
        limit,
        offset,
        order: [
            [sortBy, sortDesc]
        ],
        include: [
          {
            model: User,
            as: 'User',
            attributes: ['nama', 'email']
          },
          {
            model: Jadwal,
            as: 'Jadwal',
            attributes: ['waktu'],
            include: [
              {
              model: Pelatihan,
              as: 'Pelatihan',
              attributes: ['nama']
              }
            ]
          },
        ],
      })

      if (pesertaDoc.count === 0) {
        return res.status(401).send({
          message: 'Data peserta pelatihan kosong'
        })
      }
      
      const { data, pageData } = getPagingData(pesertaDoc, page, limit)

      res.send(successPagination('peserta', data, pageData))
    } catch (error) {
      res.status(501).send({
        message: error.message
      })
    }
  },

  async getAllSchedules(req, res) {
    const jadwal = await Jadwal.findAll()

    res.send({
      data: jadwal
    })
  }
}
