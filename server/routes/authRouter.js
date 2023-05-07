const router = require('express').Router()
const {registerValidator, loginValidator} = require('../validators/authValidator')
const {registerMiddleware, loginMiddleware} = require('../middlewares/authMiddleware')
const {registerController, loginController} = require('../controllers/authController')


// Auth router
router.post('/register', registerValidator, registerMiddleware, registerController)
router.post('/login', loginValidator, loginMiddleware, loginController)

module.exports = router