//const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  type: { type: String, default: 'users' },
  name: { type: String },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String },
  job: { type: Object },
  companyId: { type: String, required: true },
  accessLevel: { type: Number, min: 1, max: 3, default: 3 },
  roles: { type: String, ref: 'Role' }
})

const User = model('User', userSchema)

module.exports = User