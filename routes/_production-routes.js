const express = require('express')
const authMiddleware = require('./../middleware/authMiddleware')

const {
  getProductions,
  getProduction,
  deleteProduction,
  addProduction,
  updateProduction,
} = require('./../controllers/production-controller')

const router = express.Router()

router.get('/productions', authMiddleware, getProductions)
router.get('/productions/:id', authMiddleware, getProduction)
router.delete('/productions/:id', authMiddleware, deleteProduction)
router.post('/productions', authMiddleware, addProduction)
router.patch('/productions/:id', authMiddleware, updateProduction)

module.exports = router
