require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user')

const APP_ADDRESS = process.env.APP_ADDRESS_D
const DB_URL = process.env.DB_URL_D

const app = express()
app.use(express.json())

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*'])
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

const start = async () => {
  try {
    await mongoose.connect(DB_URL)
    console.log(`server.js start() DB is connect`)
    app.listen(APP_ADDRESS, (error) => {
      error ? console.log(error) : console.log(`server.js Listening port: ${APP_ADDRESS}`)
    })
  } catch (error) {
    console.log(`server.js start() Error connect to DB ${error}`)
  }
}

start()



app.get('/users', async (req, res) => {
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
})

app.get('/users/:id', async (req, res) => {
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
})


app.delete('/users/:id', async (req, res) => {
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
})


app.post('/users', async (req, res) => {
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
})



app.patch('/users/:id', async (req, res) => {
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
})

