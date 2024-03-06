const fs = require('fs')
const imageDownloader = require('image-downloader')

const { Pelatihan } = require('../models')

module.exports = {
  async getPhotoById(req, res) {
    try {
      const { id } = req.params

      const photo = Pelatihan.findByPk(id, {
        attributes: ['foto']
      })

      console.log(photo);
    } catch (error) {
      res.status(500).send({
        error: error.message
      })
    }
  },

  async uploadPhotoByLink(req, res) {
    try {
      const { url } = req.body
      const filename = 'pelatihan-' + new Date().getTime() + '.jpg'

      console.log(__dirname)
      await imageDownloader.image({
        url,
        dest: __dirname + '/../uploads/' + filename
      })

      res.send({
        message: 'success upload photo',
        data: filename
      })
    } catch (error) {
      res.status(500).send({
        error: error.message
      })
    }
  },

  async uploadPhoto(req, res) {
    try {
      const { path, originalname } = req.file
      const parts = originalname.split('.')
      const extension = parts[parts.length - 1]
      const newPath = path + '.' + extension
      console.log(path);
      console.log(newPath);
      fs.renameSync(path, newPath)
      const photoName = newPath.replace('uploads\\', '')

      res.send({
        response: true,
        message: 'success',
        data: photoName
      })
    } catch (error) {
      res.status(500).send({
        response: false,
        error: error.message
      })
    }
  }
}
