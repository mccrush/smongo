const Company = require('./../models/company')

const getCompanies = async (req, res) => {
  try {
    const result = await Company.find().sort({ name: 1 })
    res
      .status(200)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при получении массива данных companies с сервера" })
  }
}

const getCompany = async (req, res) => {
  try {
    const result = await Company.findById(req.params.id)
    res
      .status(200)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при получении данных company:id с сервера" })
  }
}

const deleteCompany = async (req, res) => {
  try {
    const result = await Company.findByIdAndDelete(req.params.id)
    res
      .status(200)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при удалении данных company:id с сервера" })
  }
}

const addCompany = async (req, res) => {
  const model = new Company(req.body)
  try {
    const result = await model.save()
    res
      .status(201)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при добавлении данных companies в БД" })
  }
}

const updateCompany = async (req, res) => {
  try {
    const result = await Company.findByIdAndUpdate(req.params.id, req.body)
    res
      .status(201)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при обновлении данных companies в БД" })
  }
}

module.exports = {
  getCompanies,
  getCompany,
  deleteCompany,
  addCompany,
  updateCompany
}