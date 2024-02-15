const express = require('express')

const {
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser,
  getUserE,
  getUserK
} = require('./../controllers/user-controller')

const router = express.Router()

router.get('/users', getUsers)
router.get('/users/:id', getUser)
router.delete('/users/:id', deleteUser)
router.post('/users', addUser)
router.patch('/users/:id', updateUser)
router.post('/auth', getUserE)
router.post('/authk', getUserK)

module.exports = router
