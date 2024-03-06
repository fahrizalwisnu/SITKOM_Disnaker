let multer = require('multer')

const AuthenticationController = require('./controllers/AuthenticationController')
const DashboardController = require('./controllers/DashboardController')
const PelatihanController = require('./controllers/PelatihanController')
const PesertaController = require('./controllers/PesertaController')
const AdminController = require('./controllers/AdminController')
const PhotoController = require('./controllers/PhotoController')
const UserController = require('./controllers/UserController')

module.exports = (app) => {
  app.get('/', AuthenticationController.init)

  app.post('/api/register', AuthenticationController.register)
  app.post('/api/login', AuthenticationController.login)
  app.post('/api/logout', AuthenticationController.logout)
  app.get('/api/profile', AuthenticationController.getProfile)
  app.get('/api/init', AuthenticationController.init)

  // User
  app.get('/api/trainings', PelatihanController.getAllPelatihan)
  app.get('/api/trainings/:id', PelatihanController.getPelatihanById)

  app.get('/api/photo/:id', PhotoController.getPhotoById)
  app.post('/api/upload-photo-training-by-link', PhotoController.uploadPhotoByLink)
  
  const photosMiddleware = multer({ dest: 'uploads' })
  app.post('/api/upload', photosMiddleware.single('photos'), PhotoController.uploadPhoto)

  // Peserta
  app.post('/api/trainings/:jadwalId/apply', PesertaController.applyPeserta)
  app.get('/api/apply/:jadwalId', PesertaController.getApply)
  
  app.get('/api/dashboard', DashboardController.getDataDashboard)
  // Trainer
  app.get('/api/participants/', PesertaController.getAllPeserta)
  app.get('/api/schedules/', PesertaController.getAllSchedules)
  app.get('/api/trainings/:id/participant/', PesertaController.getPesertaPelatihan)
  
  // Admin
  // app.post('/api/users')
  // app.get('/api/users')
  app.post('/api/trainers', UserController.addTrainer)
  app.get('/api/trainers', UserController.getAllTrainer)
  
  app.post('/api/trainings', PelatihanController.addPelatihan)
  app.put('/api/trainings/:id', PelatihanController.editPelatihan)
  app.delete('/api/trainings/:id', PelatihanController.deletePelatihan)
  
  app.get('/api/admins', AdminController.getAllAdmin)
  // app.post('/api/admins', AdminController.addAdmin)
  // app.put('/api/admins/:id', AdminController.editAdmin)
  // app.delete('/api/admins/:id', AdminController.deleteAdmin)
// Admin
/**
/api/pelatihan/:id/peserta
 */
}
