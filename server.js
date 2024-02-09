require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')
//const { connectToDb, getDb } = require('./db')

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




let db

// connectToDb(error => {
//   if (!error) {
//     app.listen(APP_ADDRESS, (error) => {
//       error ? console.log(error) : console.log(`server.js Listening port: ${APP_ADDRESS}`)

//     })
//     db = getDb()
//   } else {
//     console.log(`server.js DB connection error ${error}`);
//   }
// })



app.get('/companies', (req, res) => {
  const companies = []
  db
    .collection('companies')
    .find()
    .sort({ title: 1 })
    .forEach(element => companies.push(element))
    .then(() => {
      res
        .status(200)
        .json(companies)
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Ошибка при получении данных с сервера" })
    })
})

app.get('/users', (req, res) => {
  const users = []
  db
    .collection('users')
    .find()
    .sort({ title: 1 })
    .forEach(element => users.push(element))
    .then(() => {
      res
        .status(200)
        .json(users)
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Ошибка при получении данных users с сервера" })
    })
})

app.get('/users/:id', (req, res) => {
  db
    .collection('users')
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((doc) => {
      res
        .status(200)
        .json(doc)
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Ошибка при получении данных users с сервера" })
    })
})


app.delete('/users/:id', (req, res) => {
  db
    .collection('users')
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then((result) => {
      res
        .status(200)
        .json(result)
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Ошибка при удалении данных users с сервера" })
    })
})


app.post('/users', async (req, res) => {
  try {
    const result = await db.collection('users').insertOne(req.body)
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
  if (ObjectId.isValid(req.params.id)) {
    try {
      const result = await db.collection('users').updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
      res
        .status(201)
        .json(result)
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ошибка при обновлении данных users в БД" })
    }
  } else {
    console.log(`server.js при обновлении данных указан не корректный Id`);
  }
})

