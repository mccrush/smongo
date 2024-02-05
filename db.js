const { MongoClient } = require('mongodb')
//const { URL } = require('vars.js')

const URL = 'mongodb://127.0.0.1:27017/'

let dbConnection

module.exports = {
  connectToDb: (cb) => {
    MongoClient
      .connect(URL)
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