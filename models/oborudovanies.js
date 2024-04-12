const { Schema, model } = require('mongoose')

const oborudovanieSchema = new Schema({
  type: { type: String, default: 'oborudovanies' },
  title: { type: String, required: true },
  price: [{ title: Number, default: 0 }],
  ed: [{ title: String, default: '' }],
})

const Oborudovanie = model('Oborudovanie', oborudovanieSchema)

module.exports = Oborudovanie