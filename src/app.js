const express = require('express')
const morgan = require('morgan')
const path = require('path')


const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(require('./routes/index'))

app.use(express.static(path.join(__dirname, 'public')))
app.use('/css', express.static(path.join(__dirname, '/public/css')))
app.use('/js', express.static(path.join(__dirname, '/public/js')))

module.exports = app