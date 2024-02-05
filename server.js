const express = require('express')
const { connectToDb, getDb } = require('./db')

//const APP_ADDRESS = '127.0.5.66:55542'
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

