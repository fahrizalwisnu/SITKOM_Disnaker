module.exports = (sequelize, Sequelize) => {
    const Pengaduan = sequelize.define(
        "Pengaduan",
        {
            userId: {
                type: Sequelize.INTEGER
            },
            nama: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            judul: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            isi: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
        },
        {
            freezeTableName: true
        }
    )

    return Pengaduan
}