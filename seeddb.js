let db = require('./models')

db.category.create({
    name: 'incidents'
})
.then((category) => {
    console.log(category)
})
.catch(err => {
    console.log(err)
})

db.category.create({
    name: 'events'
})
.then((event) => {
    console.log(event)
})
.catch(err => {
    console.log(err)
})

db.category.create({
    name: 'classifieds'
})
.then((classified) => {
    console.log(classified)
})
.catch(err => {
    console.log(err)
})

db.category.create({
    name: 'peoples'
})
.then((people) => {
    console.log(people)
})
.catch(err => {
    console.log(err)
})

