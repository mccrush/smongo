require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user-routes')


// const APP_IP = process.env.APP_IP_D
// const APP_PORT = process.env.APP_PORT_D
// const DB_URL = process.env.DB_URL_D

const APP_IP = process.env.APP_IP
const APP_PORT = process.env.APP_PORT
const DB_URL = process.env.DB_URL

const app = express()
app.use(express.json())


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://testapp.na4u.ru')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use(userRoutes)

const start = async () => {
  try {
    await mongoose.connect(DB_URL)
    console.log(`server.js start() DB is connect`)
    // app.listen(APP_PORT, (error) => {
    //   error ? console.log(error) : console.log(`server.js Listening port: ${APP_PORT}`)
    // })
    app.listen(APP_PORT, APP_IP, (error) => {
      error ? console.log(error) : console.log(`server.js Listening port: ${APP_PORT}`)
    })
  } catch (error) {
    console.log(`server.js start() Error connect to DB ${error}`)
  }
}

start()