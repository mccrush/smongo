//const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, default: 'users' },
  email: { type: String, required: true },
  phone: { type: String },
  job: { type: String },
  companyId: { type: String, required: true },
  accessLevel: { type: Number, min: 1, max: 3, default: 3 },
})

const User = model('User', userSchema)

module.exports = User