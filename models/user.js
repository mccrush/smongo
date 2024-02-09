//const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: { type: String, required: true },
  jobId: { type: String },
  accessLevel: { type: Number, min: 1, max: 3, default: 3 },
})

const User = model('User', userSchema)

module.exports = User