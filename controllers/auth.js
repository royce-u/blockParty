//node modules/variables
router = require('express').Router()

//GET /auth/login - this is a page that renders login form
router.get('/login', (req, res) => {
    res.render('auth/login')
})
//post /auth/login - place for login form to post to
router.post('/login', (req, res) => {
    console.log('DATA', req.body)
    res.send('Hello from the post route')
})
//GET /auth/signup - this is a page that renders the signup form
router.get('/signup', (req, res) => {
    res.render('auth/signup', { data: {} })
})

//POST /auth./signup
router.post('/signup', (req, res) => {
    if (req.body.password !== req.body.password_verify) {
        //send error msg about passwords not matching
        //put user back onto signup form to resubmit
        console.log('passwords do not match')
        res.render('auth/signup', { data: req.body })
    }
    else {
        res.send('successsss')
    }
})

//export - allows to include in another page
module.exports = router