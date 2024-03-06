const {
  Pengaduan,
  Peserta,
  Jadwal,
  Pelatihan,
  User,
  Kartu_Kuning
} = require('../models')
const { validationResult } = require('express-validator')
const {
  setQueryPagination,
  getPagingData
} = require('../helper/modulePartials')
const { successPagination, notFound } = require('../helper/responseApi')

function parsingYellowcardsData(inputData) {
  const dataParse = inputData.map((item) => {
    let statusLabel
  
    if (item.status === 0) {
      statusLabel = 'Belum diverifikasi'
    } else if (item.status === 1) {
      statusLabel = 'Disetujui'
    } else {
      statusLabel = 'Ditolak'
    }

    return {
      nama: item.nama,
      foto: item.foto,
      status: statusLabel,
      tanggalPengajuan: new Date(item.createdAt).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  })

  return dataParse
}

function parsingTrainingsData(inputData) {
  const dataParse = inputData.map((item) => {
    return {
      jadwal: new Date(item.Jadwal.waktu).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      pelatihan: item.Jadwal.Pelatihan.nama,
      deskripsi: item.Jadwal.Pelatihan.deskripsi,
      foto: item.Jadwal.Pelatihan.foto,
      trainer: item.Jadwal.Pelatihan.User.nama
    }
  })

  return dataParse
}

module.exports = {
  async createReport(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
      }

      const report = await Pengaduan.create({
        nama: req.body.nama,
        email: req.body.email,
        judul: req.body.judul,
        isi: req.body.isi
      })

      res.status(201).json({ message: 'Report berhasil dibuat', data: report })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Report gagal dibuat' })
    }
  },

  async getAllUsersTrainings(req, res) {
    try {
      const { page, limit, offset, sortBy, sortDesc } = setQueryPagination(req)

      const results = await Peserta.findAndCountAll({
        attributes: [],
        where: {
          userId: req.params.userId
        },
        limit,
        offset,
        order: [[sortBy, sortDesc]],
        include: [
          {
            model: Jadwal,
            as: 'Jadwal',
            attributes: ['waktu'],
            include: [
              {
                model: Pelatihan,
                as: 'Pelatihan',
                attributes: ['nama', 'foto', 'deskripsi'],
                include: [
                  {
                    model: User,
                    as: 'User',
                    attributes: ['nama']
                  }
                ]
              }
            ]
          }
        ]
      })

      if (results.count === 0) {
        return res.status(404).json(notFound('Data pelatihan kosong'))
      }

      results.rows = parsingTrainingsData(results.rows)

      const { data, pageData } = getPagingData(results, page, limit)

      res.json(successPagination('pelatihan', data, pageData))
    } catch (error) {
      res.status(500).json({ message: 'Data pelatihan gagal ditemukan' })
    }
  },

  async getAllUsersYellowCards(req, res) {
    try {
      const { page, limit, offset, sortBy, sortDesc } = setQueryPagination(req)

      const results = await Kartu_Kuning.findAndCountAll({
        attributes: ['nama', 'status', 'foto', 'createdAt'],
        where: {
          userId: req.params.userId
        },
        limit,
        offset,
        order: [[sortBy, sortDesc]]
      })

      if (results.count === 0) {
        return res.status(404).json(notFound('Data kartu kuning kosong'))
      }

      results.rows = parsingYellowcardsData(results.rows)

      const { data, pageData } = getPagingData(results, page, limit)

      res.json(successPagination('kartu kuning', data, pageData))
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Report gagal ditampilkan' })
    }
  },

  async getReportById(req, res) {
    try {
      const report = await Pengaduan.findOne({
        where: {
          id_report: req.params.id
        }
      })

      if (!report) {
        res.status(400).json({ message: 'Report tidak dapat ditemukan' })
        return
      }

      res.status(200).json(report)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Report gagal ditampilkan' })
    }
  },

  async updateReport(req, res) {
    try {
      const report = await Pengaduan.findOne({
        where: {
          id_report: req.params.id_report
        }
      })

      if (!report) {
        res.status(400).json({ message: 'Report tidak dapat ditemukan' })
        return
      }

      await Pengaduan.update(req.body, {
        where: {
          id_report: req.params.id_report
        }
      })

      res.status(200).json({ message: 'Report berhasil diupdate' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Report gagal diupdate' })
    }
  },

  async deleteReport(req, res) {
    try {
      const report = await Pengaduan.findOne({
        where: {
          id_report: req.params.id_report
        }
      })

      if (!report) {
        res.status(400).json({ message: 'Report tidak dapat ditemukan' })
        return
      }

      await Pengaduan.destroy({
        where: {
          id_report: req.params.id_report
        }
      })

      res.status(200).json({ message: 'Report berhasil dihapus' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Report gagal dihapus' })
    }
  },
  // aproval
  async approveReport(req, res) {
    try {
      const report = await Pengaduan.findOne({
        where: {
          id_report: req.params.id_report
        }
      })

      if (!report) {
        res.status(400).json({ message: 'Report tidak dapat ditemukan' })
        return
      }

      await Pengaduan.update(req.body, {
        where: {
          id_report: req.params.id_report
        }
      })

      res.status(200).json({ message: 'Report berhasil diupdate' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Report gagal diupdate' })
    }
  },
  // reject
  async rejectReport(req, res) {
    try {
      const report = await Pengaduan.findOne({
        where: {
          id_report: req.params.id_report
        }
      })

      if (!report) {
        res.status(400).json({ message: 'Report tidak dapat ditemukan' })
        return
      }

      await Pengaduan.update(req.body, {
        where: {
          id_report: req.params.id_report
        }
      })

      res.status(200).json({ message: 'Report berhasil diupdate' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Report gagal diupdate' })
    }
  }
}
