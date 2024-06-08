const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return { isAuth: false }
    }
    const decoded = jwt.verify(token, config.get('Secret-Key'))
    req.user = decoded
    next()
  } catch (error) {
    // console.log(error);
    // res.status(401).json({message: 'No auth'})
    next()
  }
}