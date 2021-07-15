const express = require('express')
const app = new express()
const PORT = process.env.PORT || 3000
const dataArticle = require('./data.json')
const random = Math.floor(Math.random() * (13 - 0 + 1) + 0)
app.use(express.json()) // Um die Daten in json Format umzuwandeln
app.use(express.urlencoded({ extended: true }))
const currentDay = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
const fileSyst = require('fs')
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');
const nodemail = require('nodemailer')

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    console.log(dataArticle)
    res.render('index', { data: dataArticle })
})
app.get('/newArticle', (req, res) => {
    res.render('newArticle', { data: dataArticle })
})

app.get('/:id', function (req, res) {
    const article_ID = req.params.id; // 'user'
    console.log(dataArticle[article_ID])
    res.render('blog', { data: dataArticle, id: article_ID })
});
app.post('/', (req, res) => {
    console.log(req.body)
    dataArticle.push({
        id: dataArticle.length,
        url: req.body.urlPicture,
        title: req.body.title,
        body: req.body.text,
        published_at: currentDay,
        author: req.body.author,
        author_bild: req.body.authorPic
    })
    console.log(dataArticle)
    fileSyst.writeFile('./data.json', JSON.stringify(dataArticle), 'utf8', (err) => {
        if (err) throw err
    })
    res.redirect('/newArticle')
})
app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) })