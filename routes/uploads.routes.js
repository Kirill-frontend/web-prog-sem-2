const Router = require('express')
const router = Router()

const path = require('path')
const fs = require('fs')


const Post = require('../models/Post')
const fetch = require('node-fetch')
const config = require('config')


const postUrl = config.get('URL-Photos')
const userUrl = config.get('URL-Users')

router.post('/new', async (req, res) => {
  try {
    const file = req.file
    const title = req.body.photoTitle
    const userId = req.body.userId    
    const tags = req.body.photoTags
    console.log(req.body);

    const getUsernameReq = await fetch(userUrl + '/' + userId)
    const getUsernameJSON = await getUsernameReq.json()
    

    if (!getUsernameReq.ok) {
      return res.json({ message: 'Error when creating a post' })
    }  

    if (title.length < 4) {
      res.json({ message: 'Uncorrect Title' })
    }
  

    if (!file) {
      return res.json({ message: 'Uncorrect File' })
    }
    
    if (!tags || tags.length < 4) {
      return res.json({ message: 'You must write one or more tags' })
    }    

    if (!userId) {
      return res.json({ message: 'Auth Error' })
    }    

    const tagInArray = tags.split(',').map(tag => tag.trim())

    const post = Post(title, file.originalname, getUsernameJSON.username, tagInArray)    

    const createNewPostOnGlobal = await fetch(postUrl, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    

    if (!createNewPostOnGlobal.ok) {
      return res.json({ message: 'Error when creating a post' })
    }

    const fetchPosts = await fetch(`${userUrl}/${userId}`)

    const userData = await fetchPosts.json()

    userData.posts.push(post.id)      

    const createNewPostUser = await fetch(`${userUrl}/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (!createNewPostUser.ok) {
      return res.json({ message: 'Error when creating a post' })
    }

    return res.json({ message: 'successfuly' })
  } catch (e) {
    console.log(e);
    return res.json({ message: 'Fetching error' })
  }
})

router.get('/:picname', (req, res) => {  
  const reqPictureName = req.path  
  const filename = reqPictureName.split('/')[1]      
  const pathToFile = path.resolve(`pictures/${filename}`)

  if (!fs.existsSync(pathToFile)) {    
    res.json({message: 'Server Error when taking files'})
  }
  
  res.sendFile(pathToFile)
})



module.exports = router