//const ItemModel = require('./../models/role')

const getItemModels = async (req, res) => {
  try {
    const ItemModel = require('./../models/' + req.params.type)
    const result = await ItemModel.find().sort({ title: 1 })
    res
      .status(200)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении массива данных с сервера", error })
  }
}

const getItemModel = async (req, res) => {
  try {
    const ItemModel = require('./../models/' + req.params.type)
    const result = await ItemModel.findById(req.params.id)
    res
      .status(200)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении данных с сервера", error })
  }
}

const deleteItemModel = async (req, res) => {
  try {
    const ItemModel = require('./../models/' + req.params.type)
    const result = await ItemModel.findByIdAndDelete(req.params.id)
    res
      .status(200)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при удалении данных с сервера", error })
  }
}

const addItemModel = async (req, res) => {
  const ItemModel = require('./../models/' + req.params.type)
  const model = new ItemModel(req.body)
  try {
    const result = await model.save()
    res
      .status(201)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при добавлении данных  в БД", error })
  }
}

const updateItemModel = async (req, res) => {
  try {
    const ItemModel = require('./../models/' + req.params.type)
    const result = await ItemModel.findByIdAndUpdate(req.params.id, req.body)
    res
      .status(201)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при обновлении данных в БД", error })
  }
}

module.exports = {
  getItemModels,
  getItemModel,
  deleteItemModel,
  addItemModel,
  updateItemModel
}