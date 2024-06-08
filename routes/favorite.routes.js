const Router = require('express')
const router = Router()

const authMiddleware = require('../middleware/auth.middleware')

const { default: fetch } = require('node-fetch')
const config = require('config')


const urlPost = config.get('URL-Photos')
const urlUser = config.get('URL-Users')


const statisticPhoto = require('../functions/statistic')

async function getNewFavoritesAsync(userId) {
  try {
    let favorites = []
    let noErrors = true
  
    const responseNewFavorites = await fetch(urlUser + '/' + userId)
    const responseNewFavoritesJSON = await responseNewFavorites.json()
  
    if (!responseNewFavorites.ok) {
      noErrors = false
      return noErrors
    }
  
    const responsePosts = await fetch(urlPost)
    const posts = await responsePosts.json()
  
    if (!responsePosts.ok) {
      noErrors = false
      return noErrors
    }

  
    // responseNewFavoritesJSON.favorites.forEach(postId => favorites = posts.filter(post => post.id === postId))
    responseNewFavoritesJSON.favorites.forEach(postId => {      
      posts.forEach(post => {
        if (postId === post.id) {          
          favorites.push(post)
        }
      })
    }) 
        

    return favorites
  } catch (e) {
    console.log(e);
    return false    
  }
}


router.post('/add', authMiddleware, async (req, res) => {
  try {    
    const userId = req.user.id
    const postId = req.body.id    
    
    const responsePost = await fetch(urlPost + '/' + postId)
    const post = await responsePost.json()      

    if (!responsePost.ok) {
      return res.status(500).json({ message: 'Error when adding to favorite' })
    }

    const responseUser = await fetch(urlUser + '/' + userId)
    const user = await responseUser.json()

    if (!responseUser.ok) {
      return res.status(500).json({ message: 'Error when adding to favorite' })
    }

    user.favorites.push(post.id)

    const addToFavoriteRes = await fetch(urlUser + '/' + userId, {
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!addToFavoriteRes.ok) {
      return res.status(500).json({ message: 'Error when adding to favorite' })
    }



    const favorites = await getNewFavoritesAsync(userId)

    if (!favorites) {
      res.json({message: 'Server Error when favorites'})
    }

    statisticPhoto('ADD_FAV', postId)

    res.status(201).json({ message: 'Successfuly added to favorite', favorites })
  } catch (e) {
    console.log(e);
    res.json({ message: 'Server Error' })
  }
})

router.post('/remove', authMiddleware, async (req, res) => {
  try {

    const userId = req.user.id
    const postId = req.body.id    

    const responsePost = await fetch(urlPost + '/' + postId)
    const post = await responsePost.json()

    if (!responsePost.ok) {
      return res.status(500).json({ message: 'Error when removing to favorite' })
    }

    const responseUser = await fetch(urlUser + '/' + userId)
    const user = await responseUser.json()

    if (!responseUser.ok) {
      return res.status(500).json({ message: 'Error when removing to favorite' })
    }

    user.favorites = user.favorites.filter(item => item !== post.id)

    const removeFavoritesRes = await fetch(urlUser + '/' + userId, {
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!removeFavoritesRes.ok) {
      return res.status(500).json({ message: 'Error when removing to favorite' })
    }


    const favorites = await getNewFavoritesAsync(userId)

    if (!favorites) {
      res.json({message: 'Server Error when favorites'})
    }

    statisticPhoto('REM_FAV', postId)


    res.status(201).json({ message: 'Successfuly removed favorite', favorites })
  } catch (e) {
    console.log(e);
    res.statusCode(500).json({ message: 'Server Error' })
  }
})

router.get('/get', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id    

    const favorites = await getNewFavoritesAsync(userId)

    if (!favorites) {
      res.json({message: 'Server Error when favorites'})
    }

    res.json(favorites)
  } catch (e) {
    console.log(e);
    res.json({message: e})
  }
})


module.exports = router