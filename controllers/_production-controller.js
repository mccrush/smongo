const Production = require('./../models/production')

const getProductions = async (req, res) => {
  try {
    const result = await Production.find().sort({ title: 1 })
    res
      .status(200)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении массива данных с сервера", error })
  }
}

const getProduction = async (req, res) => {
  try {
    const result = await Production.findById(req.params.id)
    res
      .status(200)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении данных с сервера", error })
  }
}

const deleteProduction = async (req, res) => {
  try {
    const result = await Production.findByIdAndDelete(req.params.id)
    res
      .status(200)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при удалении данных с сервера", error })
  }
}

const addProduction = async (req, res) => {
  const model = new Production(req.body)
  try {
    const result = await model.save()
    res
      .status(201)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при добавлении данных в БД", error })
  }
}

const updateProduction = async (req, res) => {
  try {
    const result = await Production.findByIdAndUpdate(req.params.id, req.body)
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
  getProductions,
  getProduction,
  deleteProduction,
  addProduction,
  updateProduction
}