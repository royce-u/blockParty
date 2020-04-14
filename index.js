//------------------------node modules-----------------------------
//require need modules
let express = require('express')
let layouts = require('express-ejs-layouts')
//create an app instance
let app = express()

//------------settings/middleware------------------
//set template language to EJS
app.set('view engine', 'ejs')

//tell express to use the layouts module
app.use(layouts)

//setup the static folder - tells express where the static folder lives
app.use(express.static('static'))

//decrypt the variables coming in via post routes (from forms) - body parser
app.use(express.urlencoded({ extended: false}))

//----------------------create routes----------------------------
//controllers
app.use('/auth', require('./controllers/auth'))

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
