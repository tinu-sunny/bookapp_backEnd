const express = require('express')

const userController = require('../controller/userController')
const bookController = require('../controller/bookController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerConfig = require('../middleware/multerMiddleware')

const route = express.Router()


route.post('/api/register',userController.userRegister)
route.post('/api/login',userController.userLogin)
route.post('/api/google-login',userController.googleEmailLogin)
route.post('/api/addbook',jwtMiddleware, multerConfig.array('UploadedImages',3), bookController.addbook)

module.exports = route