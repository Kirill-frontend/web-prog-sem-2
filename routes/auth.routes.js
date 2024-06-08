const Router = require('express')
const router = Router()

const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const fetch = require('node-fetch')
const config = require('config')

const urlUser = config.get('URL-Users')

const User = require('../models/User')

const authMiddleware = require('../middleware/auth.middleware')


// /api/auth/registation
router.post('/registation',
  body('email').isEmail(),
  body('password').isLength({ min: 4, max: 12 }),
  async (req, res) => {
    try {
      const { email, password, username } = req.body

      const isValid = validationResult(req).errors
      
      if (isValid.length) {
        res.status(400).json({ message: 'Uncorrect data' })
      }

      const users = await fetch(urlUser)      
      const json = await users.json()
          
      let candidate = json.filter(i => i.email === email)    

      if (candidate.length) {
       return res.status(409).json({ message: 'This mail is already taken' })
      }

      candidate = json.filter(i => i.username === username)

      if (candidate.length) {
        return res.status(409).json({ message: 'This username is already taken' })
       }

      const hashPassword = await bcrypt.hash(password, 5)

      const user = User(email, hashPassword, username)

      const newUser = await fetch(urlUser, {
        method: 'POST',
        body: user,
        headers: {
          'Content-type': 'application/json'
        }
      })

      const newUserResponse = await newUser.json()
      console.log('newUserResponse', newUserResponse);

      if (!newUser.ok) {
        console.log('ok', newUser.ok);
        return res.status(500).json({ message: 'Error on creating new user' })
      }

      return res.status(201).json({ message: 'User succesfuly created' })
    } catch (e) {
      console.log(e);
      res.json({ message: 'Server Error' })
    }
  })


router.post('/login', async (req, res) => {
  try {

    const { email, password } = req.body


    const response = await fetch(urlUser + '?email=' + email)
    const user = await response.json()    

    if (!Object.keys(user).length) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    const isPassValid = bcrypt.compareSync(password, user[0].password)

    if (!isPassValid) {
      return res.status(401).json({ message: 'Password not sync' })
    }

    console.log(email)
    const token = jwt.sign({ id: user[0].id }, config.get('Secret-Key'), { expiresIn: '24h' })    

    return res.json({
      message: 'You success login',
      token,
      user: {
        id: user[0].id,        
        username: user[0].username,        
        email: user[0].email,
        favorites: user[0].favorites,
        posts: user[0].posts
      }
    })
  } catch (e) {
    console.log(e);
    return res.json({ message: 'Server Error' })
  }
})

// /api/auth/auth

router.get('/auth', authMiddleware, async (req, res) => {
  try {    
    const response = await fetch(urlUser + '/' + req.user.id)
    const user = await response.json()  

    const token = jwt.sign({ id: user.id }, config.get('Secret-Key'), { expiresIn: '1h' })    

    return res.json({
      message: 'Success log in',
      token,
      user: {
        id: user.id,       
        username: user.username,
        email: user.email,
        favorites: user.favorites,
        posts: user.posts
      }
    })
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server Error' })
  }
})


module.exports = router

// Name email match 