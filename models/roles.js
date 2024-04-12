const { Schema, model } = require('mongoose')

const roleSchema = new Schema({
  type: { type: String, default: 'roles' },
  value: { type: String, unique: true, default: 'MASTER' },
})

const Role = model('Role', roleSchema)

module.exports = Role