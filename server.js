require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user-routes')


const APP_ADDRESS = process.env.APP_ADDRESS_D
const DB_URL = process.env.DB_URL_D

const app = express()
app.use(express.json())
app.use(userRoutes)

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