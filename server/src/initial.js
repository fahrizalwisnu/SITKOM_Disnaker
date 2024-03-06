const { Role, User } = require('./models')
console.log(Role);

module.exports = {
  async init() {
    try {
      await Role.bulkCreate([
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
  
      await User.create({
        nama: 'Super Admin',
        username: 'superadmin',
        email: 'su@gmail.com',
        password: '12345678',
        role_id: '1'
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}