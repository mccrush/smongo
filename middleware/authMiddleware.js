const jwt = require('jsonwebtoken')
const { secret } = require('./../config')

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    //console.log('req.headers.authorization = ', req.headers.authorization);
    //const token = req.headers.authorization.split(' ')[1]
    const token = req.headers.authorization
    if (!token) {
      return res
        .status(403)
        .json({ message: 'Пользователь не авторизован, нет токена' })
    }
    const decodeData = jwt.verify(token, secret)
    req.user = decodeData
    //console.log('middleware req.user = ', req.user)
    next()
  } catch (error) {
    console.log(error)
    return res
      .status(403)
      .json({ message: 'Пользователь не авторизован', error })
  }
}