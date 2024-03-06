const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))

function hashPassword(user) {
  const SALT_FACTOR = 10

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSalt(SALT_FACTOR)
    .then((salt) => bcrypt.hash(user.password, salt, null))
    .then((hash) => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        allowEmpty: false,
        validate: {
          notEmpty: {
            msg: 'Role harus diisi'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: false,
        validate: {
          notEmpty: {
            msg: 'Email tidak boleh kosong'
          },
          notNull: {
            msg: 'Email tidak boleh null'
          },
          isEmail: {
            msg: 'Email tidak valid'
          }
        }
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: false,
        validate: {
          notEmpty: {
            msg: 'Nama tidak boleh kosong'
          },
          notNull: {
            msg: 'Nama tidak boleh null'
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: false,
        validate: {
          notEmpty: {
            msg: 'Kata sandi tidak boleh kosong'
          },
          notNull: {
            msg: 'Kata sandi tidak boleh null'
          },
          len: {
            args: [8, 100],
            msg: 'Gunakan 8 karakter atau lebih untuk kata sandi Anda'
          }
        }
      },
      nik: {
        type: Sequelize.STRING
      },
      tempatLahir: {
        type: Sequelize.STRING
      },
      tanggalLahir: {
        type: Sequelize.DATE
      },
      foto: {
        type: Sequelize.STRING
      },
      jenisKelamin: {
        type: Sequelize.STRING
      }
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword
      }
    }
  )

  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
  }

  User.afterSync(async () => {
    try {
      const count = await User.count()
      if (count === 0) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash('12345678', salt)
        const user = [
          {
            nama: 'Super Admin',
            email: 'su@gmail.com',
            password: hashedPassword,
            foto: 'superadmin.png',
            roleId: 1
          },
          {
            nama: 'Admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            roleId: 2
          },
          {
            nama: 'Bambang Santoso',
            email: 'bambang@gmail.com',
            password: hashedPassword,
            roleId: 3
          },
          {
            nama: 'Ponaryo Astaman',
            email: 'naryo@gmail.com',
            password: hashedPassword,
            roleId: 3
          },
          {
            nama: 'Batu Ponaryo',
            email: 'ponaryo@gmail.com',
            password: hashedPassword,
            roleId: 3
          },
          {
            nama: 'Parto Kumpo',
            email: 'parto@gmail.com',
            password: hashedPassword,
            roleId: 3
          },
          {
            nama: 'Sadio Mane',
            email: 'mane@gmail.com',
            password: hashedPassword,
            roleId: 3
          },
          {
            nama: 'Dudi',
            email: 'dudi@gmail.com',
            password: hashedPassword,
            roleId: 4
          },
          {
            nama: 'Bagus',
            email: 'bagus@gmail.com',
            password: hashedPassword,
            roleId: 5
          }
        ]

        await User.bulkCreate(user)

        console.log('Initial data users inserted successfully.')
      }
    } catch (error) {
      console.error('Error in before insert users:', error)
    }
  })

  return User
}
