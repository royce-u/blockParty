//require environment variables
require('dotenv').config()

//require node modules
let passport = require('passport')

//require any strategies (types of auth we want to use) 
let LocalStrategy = require('passport-local').Strategy

//import a reference to our datbase
let db = require('../models')

//serialization and deserialization functions
//these are for passport to use in order to store/look up user info
//SERIALIZE: reduce a user object to just it's id field
passport.serializeUser((user, done) => {
    //call the callback function with the user id as an arguement
    //done(error, id) - pass a null if no error
    done(null, user.id)
})

//DESERIALIZE: reverse the process of serialize function
//in other words, take a user's ID and return the full user object
passport.deserializeUser((id, done) => {
    db.user.findByPk(id)
    .then(user => {
        done(null, user)
    })
    .catch(done)
})

//LOCAL STRATEGY: using a database that we manage ourselves (not OAuth)
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    //try looking up user by their email
    db.user.findOne({
        where: { email: email}
    })
    .then(foundUser => {

        //check if there is a user; if yes, check password
        if (foundUser && foundUser.validPassword(password)) {
            done(null, foundUser)
        }
        else {
            //BAD - user doesn't exist OR had bad password
            done(null, null)
        }

    })
    .catch(done)
}))

module.exports = passport


