//const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const companySchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, default: 'companies' },
  jobs: [String],
  stages: [{
    title: String,
    position: { type: Number, min: 1, max: 42, default: 1 },
  }],
  users: [{
    uId: String,
    fId: String,
  }]
})

const Company = model('Company', companySchema)

module.exports = Company