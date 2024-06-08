const Router = require('express')
const router = Router()

const path = require('path')
const fs = require('fs')
const mime = require('mime')
const statisticPhoto = require('../functions/statistic')
const { default: fetch } = require('node-fetch')
const config = require('config')

const urlPosts = config.get('URL-Photos')



router.get('/:picname', async (req, res) => {  

  const reqPictureName = req.path  

  const filename = reqPictureName.split('/')[1]      
  const file = path.resolve(`pictures/${filename}`)    
    
  if (!fs.existsSync(file)) {    
    res.json({message: 'Server Error when taking files'})
  }  

  const resPhotos = await fetch(urlPosts)
  let jsonPhotos = await resPhotos.json()

  jsonPhotos = jsonPhotos.filter(photo => photo.photo.includes(filename))

  statisticPhoto('ADD_DOWNLOAD', jsonPhotos[0].id)
  
  res.download(file)
})


module.exports = router