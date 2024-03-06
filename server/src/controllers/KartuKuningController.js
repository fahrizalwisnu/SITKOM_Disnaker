const { Kartu_Kuning, User } = require('../models')
// const { Op } = require('sequelize')
const { validationResult } = require('express-validator')
const {
  setQueryPagination,
  getPagingData
} = require('../helper/modulePartials')
const { successPagination } = require('../helper/responseApi')

module.exports = {
  async createYellowCard(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() })
      return
    }
    try {
      const request = await Kartu_Kuning.create(req.body)
      res
        .status(200)
        .json({ message: 'Request berhasil dibuat', data: request })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Request gagal dibuat' })
    }
  },

  async getAllYellowCard(req, res) {
    try {
      const {
        page,
        limit,
        offset,
        sortBy,
        sortDesc,
        where
      } = setQueryPagination(req)

      const results = await Kartu_Kuning.findAndCountAll({
        where,
        limit,
        offset,
        order: [
            [sortBy, sortDesc]
        ],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['nama']
          }
        ]
      })

      const { data, pageData } = getPagingData(results, page, limit)
      res.json(successPagination('kartu kuning', data, pageData))
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Data kartu kuning gagal ditemukan' })
    }
  },

  async getYellowCardById(req, res) {
    try {
      const request = await Kartu_Kuning.findOne({
        where: {
          id_request: req.params.id
        }
      })
      if (!request) {
        res.status(400).json({ message: 'Request tidak dapat ditemukan' })
        return
      }
      res.status(200).json(request)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Request gagal ditemukan' })
    }
  },

  async updateYellowCard(req, res) {
    try {
      const { id } = req.params
      const { status } = req.body
      const request = await Kartu_Kuning.findOne({
        where: {
          id
        }
      })
      if (!request) {
        res.status(400).json({ message: 'Kartu kuning tidak dapat ditemukan' })
        return
      }
      await Kartu_Kuning.update({status}, {
        where: {
          id
        }
      })
      res.status(200).json({ message: 'Kartu kuning berhasil diupdate' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Kartu kuning gagal diupdate' })
    }
  },

  async deleteYellowCard(req, res) {
    try {
      const request = await Kartu_Kuning.findOne({
        where: {
          id_request: req.params.id
        }
      })
      if (!request) {
        res.status(400).json({ message: 'Request tidak dapat ditemukan' })
        return
      }
      await Kartu_Kuning.destroy({
        where: {
          id_request: req.params.id
        }
      })
      res.status(200).json({ message: 'Request berhasil dihapus' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Request gagal dihapus' })
    }
  },

  // aproval
  async approveYellowCard(req, res) {
    try {
      const request = await Kartu_Kuning.findOne({
        where: {
          id_request: req.params.id
        }
      })
      if (!request) {
        res.status(400).json({ message: 'Request tidak dapat ditemukan' })
        return
      }
      await Kartu_Kuning.update(req.body, {
        where: {
          id_request: req.params.id
        }
      })
      res.status(200).json({ message: 'Request berhasil diupdate' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Request gagal diupdate' })
    }
  },

  async rejectYellowCard(req, res) {
    try {
      const request = await Kartu_Kuning.findOne({
        where: {
          id_request: req.params.id
        }
      })
      if (!request) {
        res.status(400).json({ message: 'Request tidak dapat ditemukan' })
        return
      }
      await Kartu_Kuning.update(req.body, {
        where: {
          id_request: req.params.id
        }
      })
      res.status(200).json({ message: 'Request berhasil diupdate' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Request gagal diupdate' })
    }
  }
}
