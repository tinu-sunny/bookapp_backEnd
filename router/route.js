const express = require('express')

const userController = require('../controller/userController')
const bookController = require('../controller/bookController')
const adminController = require('../controller/adminController')
const roleMiddleware = require('../middleware/roleMiddleware')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerConfig = require('../middleware/multerMiddleware')

const route = express.Router()


route.post('/api/register',userController.userRegister)
route.post('/api/login',userController.userLogin)
route.post('/api/google-login',userController.googleEmailLogin)
route.post('/api/addbook',jwtMiddleware,multerConfig.array('UploadedImages',3),bookController.addbook)
route.get('/api/getbook',jwtMiddleware,bookController.getBooks)
route.get('/api/lastAddbooks',bookController.latestBooks)
route.get('/api/viewbooks/:id',jwtMiddleware,bookController.viewBook)
route.get('/api/view-users-admin',jwtMiddleware,roleMiddleware("admin"),adminController.useradminview)
route.get('/api/view-allbooks-admin',jwtMiddleware,roleMiddleware("admin"),adminController.getBooks)
route.put('/api/profile-admin-update',jwtMiddleware,multerConfig.single('profile'),roleMiddleware("admin"),adminController.profileUpdate)

module.exports = route