const Router = require('express')
const router = Router()
const fetch = require('node-fetch')
const config = require('config')
const nodemailer = require('nodemailer')
const send = require('gmail-send')({
  user: 'pigmalioncoc@gmail.com',
  pass: '********'
})

const userURL = config.get('URL-Users')

const authMiddleware = require('../middleware/auth.middleware')



router.post('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id
    const message = req.body.message

    const getUser = await fetch(userURL + '/' + userId)
    const getEmail = await getUser.json()

    console.log(getEmail);
    if (!getUser.ok) {
      res.json({ message: 'Error when sending feedback' })
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pigmalioncoc',
        pass: '******'
      }
    })

    const result = await transporter.sendMail({
      from: 'Wallpaper Feedback',
      to: getEmail.email,
      subject: 'Feedback',
      text: `
        ${getEmail.username}
        ${getEmail.email}
        ${message}
      `,
      html: `
      <strong>${getEmail.username}</strong> <br/>
        ${getEmail.email} <br/> <br/>
        ${message} <br/>
      `
    })

    if (!result.accepted.length) {
      res.json({ message: 'Error' })
    }

    res.json({ message: 'Success' })

  } catch (e) {
    console.log(e);
  }
})

module.exports = router