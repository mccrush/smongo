require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user-routes')
const companyRoutes = require('./routes/company-routes')

let APP_IP = ''
let APP_PORT = ''
let DB_URL = ''

if (process.env.APP_ENV === 'dev') {
  APP_IP = process.env.APP_IP_D
  APP_PORT = process.env.APP_PORT_D
  DB_URL = process.env.DB_URL_D
} else if (process.env.APP_ENV === 'prod') {
  APP_IP = process.env.APP_IP
  APP_PORT = process.env.APP_PORT
  DB_URL = process.env.DB_URL
}


const app = express()
app.use(express.json())

app.get('/', function (req, res) {
  res.sendfile('index.html');
});


app.use((req, res, next) => {
  //res.setHeader('Access-Control-Allow-Origin', 'https://testapp.na4u.ru')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use(userRoutes)
app.use(companyRoutes)

const start = async () => {
  try {
    await mongoose.connect(DB_URL)
    console.log(`server.js start() DB is connect`)
    if (process.env.APP_ENV === 'dev') {
      app.listen(APP_PORT, (error) => {
        error ? console.log(error) : console.log(`server.js Listening dev port: ${APP_PORT}`)
      })
    } else if (process.env.APP_ENV === 'prod') {
      app.listen(APP_PORT, APP_IP, (error) => {
        error ? console.log(error) : console.log(`server.js Listening prod addres: ${APP_PORT}:${APP_PORT}`)
      })
    }
  } catch (error) {
    console.log(`server.js start() Error connect to DB ${error}`)
  }
}

start()