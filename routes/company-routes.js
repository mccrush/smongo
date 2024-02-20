const express = require('express')
const authMiddleware = require('./../middleware/authMiddleware')

const {
  getCompanies,
  getCompany,
  deleteCompany,
  addCompany,
  updateCompany
} = require('./../controllers/company-controller')

const router = express.Router()

router.get('/companies', authMiddleware, getCompanies)
router.get('/companies/:id', authMiddleware, getCompany)
router.delete('/companies/:id', authMiddleware, deleteCompany)
router.post('/companies', authMiddleware, addCompany)
router.patch('/companies/:id', authMiddleware, updateCompany)

module.exports = router
