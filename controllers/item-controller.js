
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
  try {
    if (req.params.type === 'users') {
      const User = require('./../models/users')
      const Role = require('./../models/roles')
      const bcrypt = require('bcryptjs')

      const { name, email, password, companyId } = req.body
      const candidate = await User.findOne({ email })
      if (candidate) {
        return res
          .status(500)
          .json({ message: "Пользователь с таким адресом почты уже существует" })
      }

      const hashPassword = bcrypt.hashSync(password, 7)
      const userRole = await Role.findOne({ value: 'MASTER' })
      const user = new User({ companyId, name, email, password: hashPassword, phone, roles: userRole.value })
      const result = await user.save()
      res
        .status(201)
        .json({ message: `Пользователь с email = ${result.email}  успешно создан` })
    } else {
      const ItemModel = require('./../models/' + req.params.type)
      const model = new ItemModel(req.body)
      const result = await model.save()
      res
        .status(201)
        .json(result)
    }


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