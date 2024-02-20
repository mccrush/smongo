const express = require('express')
const authMiddleware = require('./../middleware/authMiddleware')

const {
  loginUser,
  loginUserWithToken,
  getRoles,

} = require('./../controllers/auth-controller')

const router = express.Router()

router.post('/login', loginUser)
router.post('/login-token', authMiddleware, loginUserWithToken)
router.get('/roles', getRoles)

module.exports = router
