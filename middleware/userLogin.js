module.exports = (req, res, next) => {
    if (req.user) {
        //GOOD - they are logged in
        next()//proceed as planned
    } else {
        //BAD - they are note logged in!
        //send an error message + send them to the login page
        req.flash('error', 'you must be logged in to view this page')
        res.redirect('/auth/login')
    }
}