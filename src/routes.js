const express = require('express')
const routes = express.Router()
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const multerConfig = require('./config/multer')
const upload = require ('multer')(multerConfig)
const authMiddleware = require ('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require ('./app/controllers/AppointmentController')
const AvailableController = require ('./app/controllers/AvailableController')

routes.use((req, res, next)=>{
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')
  return next()
})

//(:provider) para pegar o numero do provider
routes.get('/app/appointments/new/:provider', AppointmentController.create )
routes.get('/app/available/:provider', AvailableController.index )

routes.get('/files/:file', FileController.show )
//ROTA DE LOGIN
routes.get('/', guestMiddleware, SessionController.create )
//ROTA DE CADASTRO
routes.get('/signup',guestMiddleware, UserController.create)


routes.post('/signin' , SessionController.store)
routes.post('/signup',  upload.single('avatar'), UserController.store)

routes.use('/app', authMiddleware)

//ROTA PARA LOGOUT
routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)
module.exports = routes

