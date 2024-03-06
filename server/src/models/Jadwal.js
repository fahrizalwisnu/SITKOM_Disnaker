module.exports = (sequelize, DataTypes) => {
  const Jadwal = sequelize.define(
    'Jadwal',
    {
      pelatihanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Id pelatihan harus diisi'
          }
        }
      },
      waktu: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  )

  Jadwal.afterSync(async () => {
    try {
      const count = await Jadwal.count()
      if (count === 0) {
        const jadwal = [
          {
            pelatihanId: 1,
            waktu: "2023-12-27",
          },
          {
            pelatihanId: 5,
            waktu: "2023-12-27",
          },
          {
            pelatihanId: 5,
            waktu: "2023-12-27",
          },
          {
            pelatihanId: 4,
            waktu: "2023-12-27",
          },
          {
            pelatihanId: 4,
            waktu: "2023-12-27",
          },
          {
            pelatihanId: 2,
            waktu: "2023-12-27",
          },
          {
            pelatihanId: 2,
            waktu: "2023-12-27",
          },
          {
            pelatihanId: 3,
            waktu: "2023-12-27",
          },
          {
            pelatihanId: 3,
            waktu: "2023-12-27",
          },
          {
            pelatihanId: 1,
            waktu:"2023-12-27",
          },
          {
            pelatihanId: 5,
            waktu:"2023-12-27",
          }
        ]

        await Jadwal.bulkCreate(jadwal)

        console.log('Initial data users inserted successfully.')
      }
    } catch (error) {
      console.error('Error in before insert jadwal:', error)
    }
  })

  return Jadwal
}