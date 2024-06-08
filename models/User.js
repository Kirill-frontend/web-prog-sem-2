const { v4 } = require('uuid')

function User(email, password, username) {
  const user = {
    email,
    password,
    username,
    id: v4(),
    favorites: [],
    posts: [],
    liked: []
  }

  return JSON.stringify(user)
}

module.exports = User