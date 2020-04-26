//------------------------node modules-----------------------------
//require need modules
let express = require('express')
let flash = require('connect-flash')
let layouts = require('express-ejs-layouts')
let session = require('express-session')
//create an app instance
let app = express()

//include passport(via the passport config file)
let passport = require('./config/passportConfig')

//add in environment
require('dotenv').config()

//------------settings/middleware------------------
//set template language to EJS
app.set('view engine', 'ejs')

//tell express to use the layouts module
app.use(layouts)

//setup the static folder - tells express where the static folder lives
app.use(express.static('static'))

//decrypt the variables coming in via post routes (from forms) - body parser
app.use(express.urlencoded({ extended: false}))

//set up sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

//setup connect-flash for flash alert messages (depends on session, order matters)
app.use(flash())

//setup passport(depends on session; must come after sessions)
app.use(passport.initialize())
app.use(passport.session())


//custom midle-ware = make certain variables available to EJS pages thru locals
app.use((req, res, next) => {
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next()
})


//----------------------create routes----------------------------
//controllers
app.use('/auth', require('./controllers/auth'))
app.use('/profile', require('./controllers/profile'))
app.use('/post', require('./controllers/post'))

//create a home route
app.get('/', (req, res) => {
    res.render('home')
})


//create a wildcard route (catch-all) 
app.get('*', (req, res) => {
    res.render('error')
})
//------------------------listen--------------------------------
//pick a port to listen on
app.listen(3000)
