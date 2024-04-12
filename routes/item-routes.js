const express = require('express')
const authMiddleware = require('./../middleware/authMiddleware')

const {
  getItemModels,
  getItemModel,
  deleteItemModel,
  addItemModel,
  updateItemModel
} = require('./../controllers/item-controller')

const router = express.Router()

router.get('/item/:type', authMiddleware, getItemModels)
router.get('/item/:type/:id', authMiddleware, getItemModel)
router.delete('/item/:type/:id', authMiddleware, deleteItemModel)
router.post('/item/:type', authMiddleware, addItemModel)
router.patch('/item/:type/:id', authMiddleware, updateItemModel)

module.exports = router
