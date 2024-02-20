const express = require('express')

const {
  registerUser,
  loginUser,
  getRoles,

} = require('./../controllers/auth-controller')

const router = express.Router()

router.post('/registration', registerUser)
router.post('/login', loginUser)
//router.post('/resetpass', addUser)
router.get('/roles', getRoles)

module.exports = router
