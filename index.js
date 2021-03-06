//------------------------node modules-----------------------------
//require need modules
let express = require('express')
let flash = require('connect-flash')
let layouts = require('express-ejs-layouts')
let session = require('express-session')
let methodOverride = require('method-override')
var rowdy = require('rowdy-logger')

//create an app instance
let app = express()
var rowdyResults = rowdy.begin(app)

//include passport(via the passport config file)
let passport = require('./config/passportConfig')

//add in environment
require('dotenv').config()

//------------settings/middleware------------------
//require method override
app.use(methodOverride('_method'))
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
app.use('/event', require('./controllers/event'))
app.use('/incident', require('./controllers/incident'))
app.use('/people', require('./controllers/people'))

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
var server = app.listen(process.env.PORT || 3000, function(){
    rowdyResults.print()
})


