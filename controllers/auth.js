//node modules/variables
let router = require('express').Router()
let db = require('../models')
let passport = require('../config/passportConfig')

//GET /auth/login - this is a page that renders login form
router.get('/login', (req, res) => {
    res.render('auth/login')
})
//post /auth/login - place for login form to post to
router.post('/login', passport.authenticate('local', {
    successFlash: 'successful login - welcome back!',
    successRedirect: '/profile/user',
    failureFlash: 'invalid credential',
    failureRedirect: '/auth/login'
}))
//GET /auth/signup - this is a page that renders the signup form
router.get('/signup', (req, res) => {
    res.render('auth/signup', { data: {} })
})

//POST /auth./signup
router.post('/signup', (req, res, next) => {
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
                //AUTO-LOGIN with passport
                passport.authenticate('local', {
                    successFlash: 'successful login - welcome!',
                    successRedirect: '/profile/user',
                    failureFlash: 'invalid credentials',
                    failureRedirect: '/auth/login'
                })(req, res, next)
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
                    if (e.type == 'Validation error') {
                        req.flash('error', e.message)
                    }
                })
                //put the user back onto the signup form to try again
                res.render('auth/signup', { data: req.body, alerts: req.flash() })
            }
            else {
                //generic message for any other issue
                req.flash('error', 'Server error')
                //redirect back to sign up
                res.redirect('/auth/signup')
            }
        })
    }
})

router.get('/logout', (req, res) => {
    //remove user data from session
    req.logout()
    req.flash('success', 'successfully logged out')
    res.redirect('/')
})

//export - allows to include in another page
module.exports = router

