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

router.get('/:type', authMiddleware, getItemModels)
router.get('/:type/:id', authMiddleware, getItemModel)
router.delete('/:type/:id', authMiddleware, deleteItemModel)
router.post('/:type', authMiddleware, addItemModel)
router.patch('/:type/:id', authMiddleware, updateItemModel)

module.exports = router
