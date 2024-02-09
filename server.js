//require('dotenv').config()
const express = require('express')
const { connectToDb, getDb } = require('./db')

//const APP_ADDRESS = '127.0.5.66:55542'
//const APP_ADDRESS = process.env.APP_ADDRESS
//console.log(`server.js APP_ADDRESS = ${APP_ADDRESS}`);
const APP_ADDRESS = 27017

const app = express()

let db

connectToDb(error => {
  if (!error) {
    app.listen(APP_ADDRESS, (error) => {
      error ? console.log(error) : console.log(`server.js Listening port: ${APP_ADDRESS}`)

    })
    db = getDb()
  } else {
    console.log(`server.js DB connection error ${error}`);
  }
})

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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

