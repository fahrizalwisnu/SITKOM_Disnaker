module.exports = {
  responseHelper: (req, res, next) => {
      const status = false

      res.success = (message, data) => {
          return res.json({
              status: true,
              statusCode: 200,
              message,
              data
          })
      }

      res.successGet = (namaTabel, data) => {
          return res.json({
              status: true,
              statusCode: 200,
              message: namaTabel + ' ditemukan',
              data
          })
      }

      res.successPagination = (namaTabel, currentPage, totalPages, total, data) => {
          return res.json({
              status: true,
              statusCode: 200,
              message: namaTabel + ' ditemukan',
              currentPage,
              totalPages,
              total,
              data
          })
      }

      res.successUpdate = (namaField, data) => {
          return res.json({
              status: true,
              statusCode: 200,
              message: namaField + ' berhasil diupdate',
              data
          })
      }

      res.successStore = (namaTabel, data) => {
          return res.json({
              status: true,
              statusCode: 200,
              message: namaTabel + ' berhasil disimpan',
              data
          })
      }

      res.notFound = (namaTabel) => {
          return res.status(404).json({
              status,
              statusCode: 404,
              message: namaTabel + ' tidak ditemukan',
          })
      }

      res.error400 = (message) => {
          return res.status(400).json({
              status,
              statusCode: 400,
              message
          })
      }

      res.errorPost400 = (deskripsi) => {
          return res.status(400).json({
              status,
              statusCode: 400,
              message: 'Ada field kosong atau inputan salah',
              deskripsi
          })
      }
      
      res.errorExist400 = (namaField) => {
          return res.status(400).json({
              status,
              statusCode: 400,
              message: 'Ada field kosong atau inputan salah',
              deskripsi: namaField + ' sudah ada'
          })
      }

      res.error500 = (message) => {
          return res.status(500).json({
              status,
              statusCode: 500,
              message,
          })
      }


      next()
  }
}