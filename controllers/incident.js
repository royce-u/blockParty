let express = require('express')
let db = require('../models')
let router = require('express').Router()

router.get('/', (req, res) => {
    res.render('incident/main')
})
module.exports = router