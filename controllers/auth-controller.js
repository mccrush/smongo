const User = require('./../models/user')
const Role = require('./../models/role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require('./../config')
const { json } = require('express')

const generateAccessToken = (id, roles) => {
  const payload = {
    id, roles
  }
  return jwt.sign(payload, secret, { expiresIn: '24h' })
}

const getRoles = async (req, res) => {
  try {
    // Запустить для создания стартовых ролей. Затем закомментировать
    const userRole = new Role()
    const adminRole = new Role({ value: 'ADMIN' })
    const managerRole = new Role({ value: 'MANAGER' })
    await userRole.save()
    await adminRole.save()
    await managerRole.save()
    res.json('server work')
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении ролей roles с сервера", error })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(500)
        .json({ message: "Пользователь с таким адресом почты не найден" })
    }

    const validPassword = bcrypt.compareSync(password, user.password)

    if (!validPassword) {
      return res
        .status(500)
        .json({ message: "Введен неверный пароль" })
    }

    const token = generateAccessToken(user._id, user.roles)
    res
      .status(200)
      .json({ token })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при попытке залогинться", error })
  }
}



module.exports = {
  loginUser,
  getRoles,
}