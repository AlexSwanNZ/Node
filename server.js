const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()
var m_mode = true

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) console.log('Unable to append to server log')
    })
    next()
})

app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    if(m_mode) res.render('maintenance.hbs', {
        page_title: 'Under Maintenance',
    })
    else next()
})

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('scream', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        page_title: 'Home Page',
        welcome_message: 'Welcome to Swan site',
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        page_title: 'About Page',
    })
})

app.get('/bad', (req, res) => {
    res.send({
        error_message: "Unable to execute request"
    })
})

app.listen(3000, () => {
    console.log('Server started on port: 3000')
})