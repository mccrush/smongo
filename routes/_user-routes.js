const express = require('express')
const authMiddleware = require('./../middleware/authMiddleware')

const {
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser,
} = require('./../controllers/user-controller')

const router = express.Router()

router.get('/users', authMiddleware, getUsers)
router.get('/users/:id', authMiddleware, getUser)
router.delete('/users/:id', authMiddleware, deleteUser)
router.post('/users', authMiddleware, addUser)
router.patch('/users/:id', authMiddleware, updateUser)

module.exports = router
