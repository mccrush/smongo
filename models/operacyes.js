const { Schema, model } = require('mongoose')

const operacySchema = new Schema({
  type: { type: String, default: 'operacyes' },
  title: { type: String, required: true },
  price: [{ title: Number, default: 0 }],
  ed: [{ title: String, default: '' }],
})

const Operacy = model('Operacy', operacySchema)

module.exports = Operacy