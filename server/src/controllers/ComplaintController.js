const { Pengaduan } = require("../models")
// const { Op } = require("sequelize")
// const { validationResult } = require('express-validator')
// const { getPagination, getPagingData } = require('../helper/Pagination.js')
const {
  setQueryPagination,
  getPagingData
} = require('../helper/modulePartials')
const { successPagination } = require('../helper/responseApi')

module.exports = {
    async createReport(req, res) {
        try {
            const report = await Pengaduan.create({
                userId: req.body.userId,
                nama: req.body.nama,
                email: req.body.email,
                judul: req.body.judul,
                isi: req.body.isi,
            });
    
            res.status(201).json({ message: "Berhasil mengajukan pengaduan", data: report });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Gagal mengajukan pengaduan" });
        }
    },
    
    async getAllReport(req, res) {
        try {
            const {
              page,
              limit,
              offset,
              sortBy,
              sortDesc,
              where
            } = setQueryPagination(req)
    
            const results = await Pengaduan.findAndCountAll({
                where,
                limit,
                offset,
                order: [
                    [sortBy, sortDesc]
                ]
            })

            const { data, pageData } = getPagingData(results, page, limit)
    
            res.json(successPagination('pengaduan', data, pageData))
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Pengaduan gagal ditampilkan" });
        }
    },
    
    async getReportById(req, res) {
        try {
            const report = await Pengaduan.findOne({
                where: {
                    id_report: req.params.id,
                },
            });
    
            if (!report) {
                res.status(400).json({ message: "Report tidak dapat ditemukan" });
                return;
            }
    
            res.status(200).json(report);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Report gagal ditampilkan" });
        }
    },
    
    // async updateReport(req, res) {
    //     try {
    //         const report = await Pengaduan.findOne({
    //             where: {
    //                 id_report: req.params.id_report,
    //             },
    //         });
    
    //         if (!report) {
    //             res.status(400).json({ message: "Report tidak dapat ditemukan" });
    //             return;
    //         }
    
    //         await Pengaduan.update(req.body, {
    //             where: {
    //                 id_report: req.params.id_report,
    //             },
    //         });
    
    //         res.status(200).json({ message: "Report berhasil diupdate" });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: "Report gagal diupdate" });
    //     }
    // },
    
    // async deleteReport(req, res) {
    //     try {
    //         const report = await Pengaduan.findOne({
    //             where: {
    //                 id_report: req.params.id_report,
    //             },
    //         });
    
    //         if (!report) {
    //             res.status(400).json({ message: "Report tidak dapat ditemukan" });
    //             return;
    //         }
    
    //         await Pengaduan.destroy({
    //             where: {
    //                 id_report: req.params.id_report,
    //             },
    //         });
    
    //         res.status(200).json({ message: "Report berhasil dihapus" });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: "Report gagal dihapus" });
    //     }
    // },
    // // aproval
    // async approveReport(req, res) {
    //     try {
    //         const report = await Pengaduan.findOne({
    //             where: {
    //                 id_report: req.params.id_report,
    //             },
    //         });
    
    //         if (!report) {
    //             res.status(400).json({ message: "Report tidak dapat ditemukan" });
    //             return;
    //         }
    
    //         await Pengaduan.update(req.body, {
    //             where: {
    //                 id_report: req.params.id_report,
    //             },
    //         });
    
    //         res.status(200).json({ message: "Report berhasil diupdate" });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: "Report gagal diupdate" });
    //     }
    // },
    // // reject
    // async rejectReport(req, res) {
    //     try {
    //         const report = await Pengaduan.findOne({
    //             where: {
    //                 id_report: req.params.id_report,
    //             },
    //         });
    
    //         if (!report) {
    //             res.status(400).json({ message: "Report tidak dapat ditemukan" });
    //             return;
    //         }
    
    //         await Pengaduan.update(req.body, {
    //             where: {
    //                 id_report: req.params.id_report,
    //             },
    //         });
    
    //         res.status(200).json({ message: "Report berhasil diupdate" });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: "Report gagal diupdate" });
    //     }
    // }
}