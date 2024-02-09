//const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: { type: String, required: true },
  jobId: { type: String },
  accessLevel: { type: String, required: true },
})

const User = model('User', userSchema)

module.exports = User