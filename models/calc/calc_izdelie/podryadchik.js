const { Schema, model } = require('mongoose')

const podryadchikSchema = new Schema({
  type: { type: String, default: 'podryadchiki' },
  title: { type: String, required: true },
  price: [{ title: Number, default: 0 }],
  ed: [{ title: String, default: '' }],
})

const Podryadchik = model('Podryadchik', podryadchikSchema)

module.exports = Podryadchik