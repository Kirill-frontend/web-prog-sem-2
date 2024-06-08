const { v4 } = require("uuid")

function Post(title, filename, author, tags) {
  const post = {
    title,
    author,
    photo: `http://localhost:5000/upload/${filename}`,
    id: v4(),
    tags,
    statistic: {
      favorites: 0,
      downloads: 0,
      likes: 0
    }    
  }

  return post
}

module.exports = Post