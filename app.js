require('./models/connection')
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var loginRouter = require('./routes/login')
var usersRouter = require('./routes/users')
var homeRouter = require('./routes/home')
var session = require('express-session')

var app = express()
app.use(
  session({
    secret: 'a4f8071f-c873-4447-8ee2',
    resave: false,
    saveUninitialized: false,
  })
)

app.locals.parseDate = function (date) {
  var day = String(date.getDate())
  if (day.length < 2) {
    day = `0${day}`
  }
  var month = String(date.getMonth() + 1)
  if (month.length < 2) {
    month = `0${month}`
  }

  return `${day}/${month}`
}

app.locals.parseYear = function (date) {
  var day = String(date.getDate())
  if (day.length < 2) {
    day = `0${day}`
  }
  var month = String(date.getMonth() + 1)
  if (month.length < 2) {
    month = `0${month}`
  }

  var year = String(date.getFullYear())

  return `${day}/${month}/${year}`
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', loginRouter)
app.use('/users', usersRouter)
app.use('/home', homeRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
