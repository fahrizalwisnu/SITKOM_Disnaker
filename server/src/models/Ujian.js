module.exports = (sequelize, DataTypes) => {
  const Pelatihan = sequelize.define(
    'Ujian',
    {
      id_pengajar: DataTypes.STRING,
      deskripsi: DataTypes.STRING,
      dokumentasi: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  )

  return Pelatihan
}
