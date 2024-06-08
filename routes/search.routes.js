const Router = require('express')
const router = Router()

const config = require('config')
const { default: fetch } = require('node-fetch')

const urlPosts = config.get('URL-Photos')

router.get('/search', async (req, res) => {
  try {
    const criteria = req.query.search    
  
    const responsePosts = await fetch(urlPosts)
    const jsonPosts = await responsePosts.json()
  
    const searchedPosts = jsonPosts.filter(post => post.tags.includes(criteria))  
    res.json(searchedPosts)
  } catch (e) {
    console.log(e);
    throw e
  }
})




module.exports = router