const express = require('express')

const {
  getCompanies,
  getCompany,
  deleteCompany,
  addCompany,
  updateCompany
} = require('./../controllers/company-controller')

const router = express.Router()

router.get('/companies', getCompanies)
router.get('/companies/:id', getCompany)
router.delete('/companies/:id', deleteCompany)
router.post('/companies', addCompany)
router.patch('/companies/:id', updateCompany)

module.exports = router
