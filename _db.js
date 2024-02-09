//require('dotenv').config()
const { MongoClient } = require('mongodb')
//const { DB_URL } = require('vars.js')
//const DB_URL = process.env.DB_URL

const DB_URL = 'mongodb://127.0.0.1:27017/erp'

let dbConnection

module.exports = {
  connectToDb: (cb) => {
    MongoClient
      .connect(DB_URL)
      .then(client => {
        console.log('db.js connected to MongoDB')
        dbConnection = client.db()
        return cb()
      })
      .catch(error => {
        return cb(error)
      })
  },

  getDb: () => dbConnection
}

