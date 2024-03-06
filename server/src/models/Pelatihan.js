module.exports = (sequelize, DataTypes) => {
  const Pelatihan = sequelize.define(
    'Pelatihan',
    {
      nama: DataTypes.STRING,
      trainerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        allowEmpty: false,
        validate: {
          notEmpty: {
            msg: 'Id trainer tidak boleh kosong'
          },
          notNull: {
            msg: 'Id trainer tidak boleh null'
          }
        }
      },
      deskripsi: DataTypes.STRING,
      foto: DataTypes.STRING,
      materi: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  )

  Pelatihan.afterSync(async () => {
    try {
      const count = await Pelatihan.count()
      if (count === 0) {
        const pelatihan = [
          {
            nama: 'Bahasa',
            trainerId: 3,
            deskripsi: 'Pelatihan bahasa',
            foto: 'bahasa.png',
            roleId: 1
          },
          {
            nama: 'Handicraft',
            trainerId: 4,
            deskripsi: 'Pelatihan Handicraft',
            foto: 'handicraft.png',
            roleId: 2
          },
          {
            nama: 'Komputer',
            trainerId: 5,
            deskripsi: 'Pelatihan Komputer',
            foto: 'komputer.png',
            roleId: 3
          },
          {
            nama: 'Las',
            trainerId: 6,
            deskripsi: 'Pelatihan Las',
            foto: 'las.png',
            roleId: 4
          },
          {
            nama: 'Listrik',
            trainerId: 7,
            deskripsi: 'Pelatihan Listrik',
            foto: 'listrik.png',
            roleId: 5
          }
        ]

        await Pelatihan.bulkCreate(pelatihan)

        console.log('Initial data pelatihan inserted successfully.')
      }
    } catch (error) {
      console.error('Error in before insert pelatihan:', error)
    }
  })

  return Pelatihan
}
