const express = require('express')

const {
  loginUser,
  getRoles,

} = require('./../controllers/auth-controller')

const router = express.Router()

router.post('/login', loginUser)
router.get('/roles', getRoles)

module.exports = router
