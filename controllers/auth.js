//node modules/variables
router = require('express').Router()

//routes
router.get('/login', (req, res) => {
    res.render('auth/login')
})
//post /auth/login - place for login form to post to
router.post('/login', (req, res) => {
    console.log('DATA', req.body)
    res.send('Hello from the post route')
})

router.get('/signup', (req, res) => {
    res.render('auth/signup')
})

//export - allows to include in another page
module.exports = router