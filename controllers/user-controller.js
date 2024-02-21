const User = require('./../models/user')
const Role = require('./../models/role')
const bcrypt = require('bcryptjs')

const getUsers = async (req, res) => {
  try {
    const result = await User.find().sort({ name: 1 })
    res
      .status(200)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении массива данных users с сервера", error })
  }
}

const getUser = async (req, res) => {
  try {
    const result = await User.findById(req.params.id)
    res
      .status(200)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении данных user:id с сервера", error })
  }
}

const deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id)
    res
      .status(200)
      .json({ message: "Пользователь успешно удален" })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при удалении данных user:id с сервера", error })
  }
}

// Создание и регистрация новых пользователей
const addUser = async (req, res) => {
  try {
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при добавлении данных users в БД", error })
  }
}

const updateUser = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body)
    res
      .status(201)
      .json({ message: "Пользователь успешно обновлен" })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при обновлении данных users в БД", error })
  }
}

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser
}