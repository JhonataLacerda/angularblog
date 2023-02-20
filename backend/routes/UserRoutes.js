const  router = require('express').Router()
const UserController = require('../controllers/UserController')

//Middlewares
const verifyToken = require('../helpers/verify-token')
const { ImageUpload } = require('../helpers/ImageUpload')
router.post('/cadastro', UserController.register)
router.post('/login', UserController.login)
router.get('/usuarios',verifyToken,UserController.getAll)
router.get('/checkuser', verifyToken, UserController.checkUser)
router.get('/:id', verifyToken, UserController.getUserById)
router.patch('/edit/:id', verifyToken, ImageUpload.single("image"), UserController.editUser)

module.exports = router