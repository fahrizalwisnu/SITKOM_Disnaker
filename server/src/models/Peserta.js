module.exports = (sequelize, Sequelize) => {
  const Peserta = sequelize.define(
    'Peserta',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Id user harus diisi'
          }
        }
      },
      jadwalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Id jadwal harus diisi'
          }
        }
      }
    },
    {
      freezeTableName: true
    }
  )

  return Peserta
}
