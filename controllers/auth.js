//node modules/variables
router = require('express').Router()
let db = require('../models')

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
        req.flash('error', 'Passwords do not match!')

        //put user back onto signup form to resubmit
        res.render('auth/signup', { data: req.body, alerts: req.flash() })
    }
    else {
        //passwords matched, now we'll findOrCreate by the use email
        db.user.findOrCreate({
            where: { email: req.body.email },
            defaults: req.body
        })
        .then(([user, wasCreated]) => {
            if(wasCreated) {
                //good - this was expected, they are actually NEW
                //TODO: AUTO-LOGIN
                res.send('yay it worked')
            }
            else {
                //BAD - this personal already had an account (redirect to login page)
                req.flash('error', 'Account already exists!')
                res.redirect('/auth/login')
            }
        })
        .catch(err => {
            console.log('Error creating a user', err)

            //check for sequelize validation errors (and make flash messages for them)
            if (err.errors) {
                err.errors.forEach(e => {
                    req.flash('error', e.message)
                })
            }
            else {
                //generic message for any other issue
                req.flash('error', 'Server error')

            }
            //redirect back to sign up
            res.redirect('/auth/signup')
        })
    }
})

//export - allows to include in another page
module.exports = router