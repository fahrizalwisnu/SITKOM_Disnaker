const { Pelatihan, User, Jadwal } = require('../models')

function parsingPelatihan(data) {
  const dateOption = {
    year: 'numeric',
    month: 'long'
  }

  return {
    id: data.id,
    nama: data.nama,
    deskripsi: data.deskripsi,
    foto: data.foto,
    materi: data.foto,
    createdAt: new Date(data.createdAt).toLocaleDateString('id-ID', dateOption),
    updatedAt: new Date(data.createdAt).toLocaleDateString('id-ID', dateOption),
    trainer: data.User.nama,
    jadwal: data.Jadwal.map((jadwal) => ({
      waktu: new Date(jadwal.waktu).toLocaleDateString('id-ID', {
        ...dateOption,
        day: 'numeric'
      })
    }))
  }
}

module.exports = {
  async getAllPelatihan(req, res) {
    try {
      const allPelatihan = await Pelatihan.findAll({
        attributes: ['id', 'nama', 'foto'],
        order: [['id', 'DESC']]
      })

      if (!allPelatihan) {
        return res.status(404).send({
          message: 'Data pelatihan kosong'
        })
      }

      res.send({
        message: 'success',
        statusCode: 200,
        data: allPelatihan
      })
    } catch (error) {
      res.status(500).send({
        error: error.message
      })
    }
  },

  async getPelatihanById(req, res) {
    try {
      const { id } = req.params

      const pelatihan = await Pelatihan.findByPk(id, {
        include: [
          {
            model: User,
            as: 'User',
            attributes: ['nama']
          },
          {
            model: Jadwal,
            as: 'Jadwal',
            attributes: ['waktu']
          }
        ]
      })

      if (!pelatihan) {
        return res.status(404).send({
          message: 'Data pelatihan tidak ditemukan',
          statusCode: 404
        })
      }

      const dataParse = parsingPelatihan(pelatihan)

      res.send({
        message: 'success',
        statusCode: 200,
        data: dataParse
      })
    } catch (error) {
      res.status(500).send({
        error: error.message
      })
    }
  },

  async addPelatihan(req, res) {
    try {
      const { trainerId, nama, materi, foto, deskripsi } = req.body

      // if (!trainerId || !nama || !materi) {
      //   return res.status(500).send({
      //     message: 'Isi semua data',
      //     response: false
      //   })
      // }

      const dataPelatihan = await Pelatihan.create({
        trainerId,
        nama,
        materi,
        foto,
        deskripsi
      })

      if (!dataPelatihan) {
        return res.status(500).send({
          message: 'Gagal menambahkan data pelatihan'
        })
      }

      res.send({
        message: 'Berhasil menambahkan data pelatihan',
        statusCode: 200,
        data: dataPelatihan
      })
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  },

  async editPelatihan(req, res) {
    try {
      const { id } = req.params

      const pelatihan = await Pelatihan.findByPk(id)

      if (!pelatihan) {
        return res.status(404).send({
          message: 'Pelatihan tidak ditemukan',
          statusCode: 404
        })
      }

      const editForm = {
        ...req.body,
        updatedAt: new Date()
      }

      const pelatihanBaru = await Pelatihan.update(editForm, {
        where: {
          id
        }
      })

      res.send({
        message: 'Berhasil mengubah data pelatihan',
        statusCode: 200,
        data: pelatihanBaru
      })
    } catch (error) {
      res.status(500).send({
        error: error.message
      })
    }
  },

  async deletePelatihan(req, res) {
    try {
      const { id } = req.params

      const pelatihan = await Pelatihan.findByPk(id)

      if (!pelatihan) {
        return res.status(404).send({
          message: 'Data pelatihan tidak ditemukan',
          statusCode: 404
        })
      }

      const hapusPelatihan = await Pelatihan.destroy({
        where: {
          id
        }
      })

      res.send({
        message: 'Berhasil menghapus data pelatihan',
        statusCode: 200,
        data: hapusPelatihan
      })
    } catch (error) {
      res.status(500).send({
        error: error.message
      })
    }
  }
}
