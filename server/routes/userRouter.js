const router = require('express').Router()
const { verifyUserMiddleware } = require('../middlewares/authMiddleware')
const { profileController } = require('../controllers/userController')
const { makePostController, getUserPostsController, getAllPostsController } = require('../controllers/postController')
const { makePostValidator } = require('../validators/postValidator')


router.get('/profile', verifyUserMiddleware, profileController)
router.post('/post',makePostValidator, verifyUserMiddleware, makePostController)
router.get('/posts', verifyUserMiddleware, getUserPostsController)
router.get('/allPosts', verifyUserMiddleware, getAllPostsController)

module.exports = router
