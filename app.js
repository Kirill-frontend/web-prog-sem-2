const express = require('express')
const app = express()

const cors = require('cors')

const multer = require('multer')

const PORT = process.env.PORT || 5000

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'pictures')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}


app.use(express.static(__dirname))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(multer({ storage, fileFilter }).single("photoSend"))




app.use('/api/auth', require('./routes/auth.routes'))

app.use('/api/photo', require('./routes/photo.routes'))

// app.use('/api/feedback', require('./routes/sm.routes'))

app.use('/upload', require('./routes/uploads.routes'))

app.use('/favorite', require('./routes/favorite.routes'))

app.use('/download', require('./routes/download.routes'))

app.use('/search', require('./routes/search.routes'))




// Засунуть upload(Router) в папку роут  +
// Реализовать избранные +
// Сделать нормальный переход в Auth +
// Сделать в профиле список собственных постов +
// И количество добавленых в собственных постов +


// На будущее 

// Удаление поста +
// Добавить автора +
// Реализовать поиск (по хэштегам) +
// Реализовать скачку фото +
// Все адреса перенести в конфиг +
// Чтобы в массиве пользователя избранные хранились id постов +
// Существует ли такой файл? +
// Поправить стили отсуствующих данных +
// Статистика фото +
// Сделать анимации в модалке +
// Обработать ошибки когда БД чист +
// Likes +
// Переписать на RTK + и RTKQUERY 
// Сделать нормальные Toast 
// Dark Theme
// Сделать увеличение по нажатию / слайдер 
// Обратная связь  
// Систему оповещений
// Посмотреть посты пользователя
// Подписки на пользователя
// Сделать нормальные редиректы(с создание на главную, с ошибки логина не перекидовать)
// Email verify
// Добавить везде лоадеры

app.listen(PORT, () => console.log(`Server has been started  http://localhost:${PORT} ...`))