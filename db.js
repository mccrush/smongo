const { MongoClient } = require('mongodb')



//const URL = 'mongodb://c86003_nomo_na4u_ru:LaRgeCijpusad37@mongo1.c86003.h2,mongo2.c86003.h2,mongo3.c86003.h2/c86003_nomo_na4u_ru?replicaSet=MongoReplica'

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