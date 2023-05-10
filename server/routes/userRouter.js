const router = require('express').Router()
const { verifyUserMiddleware } = require('../middlewares/authMiddleware')
const { profileController } = require('../controllers/userController')
const { makePostController, getUserPostsController, getAllPostsController } = require('../controllers/postController')
const { makePostValidator } = require('../validators/postValidator')
const PostImageUploader = require('../uploaders/post-image.uploader')


router.get('/profile', verifyUserMiddleware, profileController)
router.post('/post',
    PostImageUploader('public/uploads/posts').single('image'), 
    makePostValidator, 
    verifyUserMiddleware, 
    makePostController
)
router.get('/posts', verifyUserMiddleware, getUserPostsController)
router.get('/allPosts', verifyUserMiddleware, getAllPostsController)

module.exports = router
