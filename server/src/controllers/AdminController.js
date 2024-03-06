let { User, Role } = require('../models')

const {
  setQueryPagination,
  getPagingData
} = require('../helper/modulePartials')
const {
  validationResponse,
  errorResponse,
  successGet,
  notFound,
  successPagination
} = require('../helper/responseApi')
const { NotFound } = require('../errors')

function formatValidationError(error) {
  const errors = error.errors

  let errorObject = {}
  errors.forEach((error) => {
    const { message, path } = error

    if (!errorObject[path]) {
      errorObject[path] = []
    }

    errorObject[path].push(message)
  })

  return errorObject
}

module.exports = {
  async getAllAdmin(req, res) {
    try {
      const query = setQueryPagination(req)

      const admins = await User.findAndCountAll({
        where: {
          roleId: 2
        },
        order: [[query.sortBy, query.sortDesc]],
        attributes: ['id', 'email', 'nama', 'foto'],
        offset: query.offset,
        limit: query.limit
      })

      if (admins.length === 0) {
        throw new NotFound('Data admin kosong')
      }

      const { data, pageData} = getPagingData(admins, query.page, query.limit)

      res.send(successPagination('admin', data, pageData))
    } catch (error) {
      if (error.name === 'NotFound') {
        res.status(error.code).send(notFound(error.message))
      } else {
        console.log(error.name)
        res.status(500).send({
          error: error.name
        })
      }
    }
  },

  async addTrainer(req, res) {
    try {
      const { email, password, nama, foto } = req.body

      const userExist = await User.findOne({
        where: {
          email
        }
      })

      if (userExist) {
        return res
          .status(409)
          .send(errorResponse(409, 'Conflict', 'Email sudah terdaftar'))
      }

      const rolePeserta = await Role.findOne({
        where: {
          nama: 'peserta'
        },
        attributes: ['id', 'nama']
      })

      if (!rolePeserta) {
        return res.send({
          message: 'Registrasi gagal',
          statusCode: 500
        })
      }

      const trainer = await User.create({
        email,
        password,
        nama,
        foto,
        roleId: 3
      })

      const dataObject = {
        id: trainer.id,
        nama: trainer.nama,
        email: trainer.email,
        foto: trainer.foto,
        roleId: trainer.roleId
      }

      res.send(successGet('Berhasil menambah trainer', dataObject))
    } catch (errors) {
      if (errors.name === 'SequelizeValidationError') {
        res.status(400).json(validationResponse(formatValidationError(errors)))
      } else {
        res
          .status(500)
          .send(errorResponse('Gagal menambah trainer', 500, errors.message))
      }
    }
  }
}
