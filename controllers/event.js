let express = require('express')
let db = require('../models')
let router = require('express').Router()

//GET - display all events
router.get('/', (req, res) => {
    db.post.findAll({
        where: {categoryId: 2},
        include: [db.user]
    })
    .then((post) => {
        res.render('event/main', {post})
    })
})

module.exports = router