let express = require('express')
let db = require('../models')
let router = require('express').Router()

router.get('/', (req, res) => {
    db.post.findAll({
        where: {categoryId: 1},
        include: db.user
    })
    .then((post) => {
        res.render('incident/main', {post})
    })
})


router.get('/map', (req, res) => {
    res.render('incident/map')
})
module.exports = router