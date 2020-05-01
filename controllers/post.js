let express = require('express')
let db = require('../models')
let router = require('express').Router()


// GET - displays all posts
router.get('/', (req, res) => {
    db.post.findAll()
        .then((post) => {
            res.render('post/main', { post })
        })
})

//GET - new post form
router.get('/new', (req, res) => {
    db.category.findAll()
        .then((category) => {
            res.render('post/new', { category: category })
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
        where: { id: req.params.id },
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

// //GET - goes to edit page
router.get('/:id/edit', (req, res) => {
    db.post.findOne({
        where: { id: req.params.id }
    })
    .then((post) => {
        db.category.findAll()
      .then((category) => {
        res.render('post/edit', { post , category})
      })
      .catch(err => {
          res.send(err)
      })
      })
      .catch(err => {
          res.send(err)
      })
    })

//PUT - edits a post
router.put('/:id', (req, res) => {
    db.post.update((req.body), {
        where: {id:req.params.id}
    })
    .then(() => {
        res.redirect('/post/' + req.params.id)
    })
    .catch(err => {
        res.send(err)
    })
})

//DELETE - post
router.delete('/:id', (req, res) => {
    db.post.destroy({
        where: {id: req.params.id}
    })
    .then(() => {
        res.send('are you gone?')
    })
    .catch(()=> {
        res.send(err)
    })
})




module.exports = router