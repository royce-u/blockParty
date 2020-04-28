let express = require('express')
let db = require('../models')
let router = require('express').Router()


// GET - displays all posts
router.get('/', (req, res) => {
    db.post.findAll()
    .then((post) => {
        res.render('post/main',{ post })
    })
})

//GET - new post form
router.get('/new', (req, res) => {
    db.category.findAll()
    .then((category) => {
        res.render('post/new', {category:category})
    })
    
})

//POST - submit new post
router.post('/', (req, res) => {
    db.post.create(req.body)
    .then(() => {
        res.redirect('/post')
    })
    .catch(err => {
        res.send('error', err)
    })
})

//GET/post/:id - displays a specific post
router.get('/:id', (req, res) => {
    db.post.findOne({
        where: {id: req.params.id},
        include: [db.comment, db.user]
    })  
    .then((post) => {
        res.render('post/show', { post })
    })
    .catch(err => {
        console.log(err)
        res.render('error', err)
    })
})

//POST - posts comments to db
router.post('/comments', (req, res) => {
    console.log(req.body)
    db.comment.create(req.body)
    .then(() => {
        res.redirect(`${req.body.postId}`)
    })
    .catch(err => {
        res.render('error', err)
    })
})




module.exports = router