module.exports = (sequelize, Sequelize) => {
  const KartuKuning = sequelize.define(
    'Kartu_Kuning',
    {
      userId: {
          type: Sequelize.INTEGER
      },
      noPendaftaran: {
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nik: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tempatLahir: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tanggalLahir: {
        type: Sequelize.STRING,
        allowNull: false
      },
      jenisKelamin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      statusPernikahan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      agama: {
        type: Sequelize.STRING,
        allowNull: false
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      noTelepon: {
        type: Sequelize.STRING,
        allowNull: false
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      freezeTableName: true
    }
  )

  return KartuKuning
}

// Function to calculate the next no_pendaftaran value
// const getNextNoPendaftaran = async () => {
//   const maxNoPendaftaran = await KartuKuning.max('noPendaftaran');
//   return maxNoPendaftaran ? maxNoPendaftaran + 1 : 1;
// };

// BeforeCreate hook to set the no_pendaftaran value before creating a record
// KartuKuning.beforeCreate(async (request) => {
//   request.no_pendaftaran = await getNextNoPendaftaran();
// })