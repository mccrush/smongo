const User = require('./../models/user')

const getUsers = async (req, res) => {
  try {
    const result = await User.find().sort({ name: 1 })
    res
      .status(200)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при получении массива данных users с сервера" })
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
      .json({ error: "Ошибка при получении данных user:id с сервера" })
  }
}

const deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id)
    res
      .status(200)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при удалении данных user:id с сервера" })
  }
}

const addUser = async (req, res) => {
  const user = new User(req.body)
  try {
    const result = await user.save()
    res
      .status(201)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при добавлении данных users в БД" })
  }
}

const updateUser = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body)
    res
      .status(201)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при обновлении данных users в БД" })
  }
}

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser
}