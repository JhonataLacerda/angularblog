const  router = require('express').Router()
const BlogController = require('../controllers/BlogController')

//Middlewares
const verifyToken = require('../helpers/verify-token')
const {ImageUpload} = require('../helpers/ImageUpload')

router.post('/postar', verifyToken, ImageUpload.array('images'), BlogController.create)
router.get('/', BlogController.getAll)
router.get('/myposts', verifyToken, BlogController.getAllUserPosts)
router.get('/:id', BlogController.getPostById)
router.delete('/removerpost/:id', verifyToken, BlogController.removeBlogById)
router.patch('/:id', verifyToken, ImageUpload.array('images'), BlogController.updatePost)



module.exports = router