const { User, Role } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const { errorResponse } = require('../helper/responseApi')

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

function parsingUser(user) {
  return {
    id: user.id,
    email: user.email,
    nama: user.nama,
    photo: user.foto,
    role: user.Role.nama
  }
}

module.exports = {
  async register(req, res) {
    try {
      const {
        email,
        password,
        nik,
        nama,
        tempatLahir,
        tanggalLahir,
        foto,
        jenisKelamin
      } = req.body

      const userExist = await User.findOne({
        where: {
          email
        }
      })

      if (userExist) {
        return res.status(403).send({
          message: 'Email pengguna sudah terdaftar'
        })
      }

      const rolePeserta = await Role.findOne({
        where: {
          nama: 'peserta'
        },
        attributes: ['id', 'nama']
      })

      // if (!rolePeserta) {
      //   return res.send({
      //     message: 'Registrasi gagal',
      //     statusCode: 500
      //   })
      // }

      const user = await User.create({
        email,
        password,
        nik,
        nama,
        tempatLahir,
        tanggalLahir,
        foto,
        jenisKelamin,
        roleId: rolePeserta.dataValues.id
      })

      user['Role'] = rolePeserta.dataValues

      const userResponse = {
        email: user.email,
        nik: user.nik,
        nama: user.nama,
        tempatLahir: user.tempatLahir,
        tanggalLahir: user.tanggalLahir,
        foto: user.foto,
        jenisKelamin: user.jenisKelamin
      }

      res.send({
        message: `Hello ${email}!`,
        user: userResponse,
        token: jwtSignUser(parsingUser(user))
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error
      })
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({
        where: {
          email
        },
        include: [
          {
            model: Role,
            as: 'Role',
            required: true,
            attributes: ['nama']
          }
        ]
      })

      if (!user) {
        return res
          .status(404)
          .json(errorResponse(404, 'Not Found', 'Pengguna tidak ditemukan'))
      }

      const isPasswordValid = await user.comparePassword(password)

      if (!isPasswordValid) {
        return res
          .status(401)
          .json(errorResponse(401, 'Unauthorized', 'Password salah'))
      }

      const userParse = parsingUser(user)
      const token = jwtSignUser(userParse)

      res.cookie('token', token).json({
        message: `Hello ${email}!. Selamat datang`,
        data: userParse,
        token
      })
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  },

  getProfile(req, res) {
    try {
      const { token } = req.cookies

      if (token) {
        jwt.verify(
          token,
          config.authentication.jwtSecret,
          {},
          async (err, userData) => {
            if (err) new Error(err)
            const user = await User.findByPk(userData.id, {
              include: [
                {
                  model: Role,
                  as: 'Role',
                  // required: true,
                  attributes: ['nama']
                }
              ]
            })

            res.json({
              message: 'success',
              data: {
                id: user.id,
                email: user.email,
                nama: user.nama,
                foto: user.foto,
                role: user.Role.nama
              }
            })
          }
        )
      } else {
        res.send(null)
      }
    } catch (error) {
      res.status(500).send({
        error: error.message
      })
    }
  },

  async logout(req, res) {
    try {
      res.cookie('token', '').send({
        message: 'logout success'
      })
    } catch (error) {
      res.status(501).send({
        message: 'logout failed'
      })
    }
  },

  async init(req, res) {
    try {
      const role = await Role.bulkCreate([
        {
          nama: 'superadmin'
        },
        {
          nama: 'admin'
        },
        {
          nama: 'trainer'
        },
        {
          nama: 'didu'
        },
        {
          nama: 'peserta'
        }
      ])

      const user = await User.create({
        nama: 'Super Admin',
        username: 'superadmin',
        email: 'su@gmail.com',
        password: '12345678',
        roleId: '1'
      })

      if (role && user) {
        return res.send({
          message: 'add role and superadmin'
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  }
}
