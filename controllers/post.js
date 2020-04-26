router = require('express').Router()
// var async = require('async')
// var express = require('require')
var db = require('../models')
let passport = require('../config/passportConfig')
// let adminLogin = require('../middleware/adminLogin')
// let userLogin = require('../middleware/userLogin')

//GET - displays all posts
router.get('/', (req, res) => {
    res.render('post/main')
})

router.get('/new', (req, res) => {
    res.render('post/new')
})



module.exports = router