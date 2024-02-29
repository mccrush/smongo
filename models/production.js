const { Schema, model } = require('mongoose')

const productionSchema = new Schema({
  type: { type: String, default: 'production' },
  title: { type: String, required: true },
  arhive: { type: String, default: false },
  stageId: { type: String, required: true },
  manager: { type: String, required: true },
  description: { type: String },
})

const Production = model('Production', productionSchema)

module.exports = Production