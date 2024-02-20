const User = require('./../models/user')
const Role = require('./../models/role')

const getRoles = async (req, res) => {
  try {
    // Запустить для создания стартовых ролей. Затем закомментировать
    // const userRole = new Role()
    // const adminRole = new Role({ value: 'ADMIN' })
    // const managerRole = new Role({ value: 'MANAGER' })
    // await userRole.save()
    // await adminRole.save()
    // await managerRole.save()
    res.json('server work')
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при получении ролей roles с сервера", error })
  }
}

const registerUser = () => { }
const loginUser = () => { }

const getUsers = async (req, res) => {
  try {
    const result = await User.find().sort({ name: 1 })
    res
      .status(200)
      .json(result)
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при получении массива данных users с сервера", error })
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
      .json({ error: "Ошибка при получении данных user:id с сервера", error })
  }
}

const getUserE = async (req, res) => {
  try {
    const result = await User.findOne({ email: req.body.email })
    if (result) {
      if (result.password === req.body.password) {
        res
          .status(200)
          .json({ _id: result._id, name: result.name, email: result.email, accessLevel: result.accessLevel, companyId: result.companyId })
      } else {
        res
          .status(500)
          .json({ error: "Введен неверный пароль" })
      }
    } else {
      res
        .status(500)
        .json({ error: "Пользователь с таким Email не найден" })
    }


  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при получении данных user:email с сервера", error })
  }
}

const getUserK = async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.body.aKey })
    if (result) {
      res
        .status(200)
        .json({ _id: result._id, name: result.name, email: result.email, accessLevel: result.accessLevel, companyId: result.companyId })
    } else {
      res
        .status(200)
        .json({ error: "Недействительный ключ" })
    }


  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при получении данных с помощью ключа с сервера", error })
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


module.exports = {
  registerUser,
  loginUser,
  getRoles,
}