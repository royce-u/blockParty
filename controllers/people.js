let express = require('express')
let db = require('../models')
let router = require('express').Router()

router.get('/', (req, res) => {
    db.post.findAll({
        where: {categoryId: 10},
        include: [db.user]
    })
    .then((post) => {
        res.render('people/main', {post})
    })
})
module.exports = router