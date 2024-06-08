const { default: fetch } = require("node-fetch")
const config = require('config')

const urlPost = config.get('URL-Photos')

// ADD_FAV, REM_FAV, ADD_DOWNLOAD, LIKE_PHOTO, UNLIKE_PHOTO
async function statisticPhoto(type, postId) {
  try {
    const responsePost = await fetch(urlPost + '/' + postId)
    const post = await responsePost.json()

    if (!responsePost.ok) {
      return new Error()
    }    

    if (type === 'ADD_FAV') {
      post.statistic.favorites = ++post.statistic.favorites
    } else if (type === 'REM_FAV') {
      post.statistic.favorites = --post.statistic.favorites
    } else if (type === 'ADD_DOWNLOAD') {
      post.statistic.downloads = ++post.statistic.downloads
    } else if (type === 'LIKE_PHOTO') {
      post.statistic.likes = ++post.statistic.likes
    } else if (type === 'UNLIKE_PHOTO') {
      post.statistic.likes = --post.statistic.likes
    }

    const pathPost = await fetch(urlPost + '/' + postId, {
      method: 'PATCH',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json'
      }
    })    

    if (!pathPost.ok) {
      return new Error()
    }


  } catch (e) {
    console.log(e);
    return new Error(e)
  }
}

module.exports = statisticPhoto