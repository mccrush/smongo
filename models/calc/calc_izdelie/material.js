const { Schema, model } = require('mongoose')

const materialSchema = new Schema({
  type: { type: String, default: 'materials' },
  title: { type: String, required: true },
  price: [{ title: Number, default: 0 }],
  ed: [{ title: String, default: '' }],
})

const Material = model('Material', materialSchema)

module.exports = Material