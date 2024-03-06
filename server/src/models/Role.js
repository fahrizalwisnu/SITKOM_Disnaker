module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    'Role',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nama: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false
    }
  )

  Role.afterSync(async () => {
    try {
      const count = await Role.count()
      if (count === 0) {
        const role = [
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
            nama: 'dudi'
          },
          {
            nama: 'peserta'
          }
        ]

        await Role.bulkCreate(role)

        console.log('Initial data role inserted successfully.')
      }
    } catch (error) {
      console.error('Error in before insert role:', error)
    }
  })

  return Role
}
