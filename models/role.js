const { Schema, model } = require('mongoose')

const roleSchema = new Schema({
  value: { type: String, unique: true, default: 'MASTER' },
  type: { type: String, default: 'roles' },
})

const Role = model('Role', roleSchema)

module.exports = Role