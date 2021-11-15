require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('../config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()
const db = require('../models')
const stream = require('../models/stream')

router.get('/', isLoggedIn, (req, res) => {
    db.trip.findAll({
        where: { userId: req.user.id },
        include: [db.stream]
    }).then((foundTrips) => {
        res.render('journal/index', {trips: foundTrips})        
    }).catch(err => console.log(err))
})

router.get('/new', isLoggedIn, (req, res) => {
    
    res.render('journal/new')
})

router.post('/:id', isLoggedIn, (req, res) => {
    tripId = req.body.id
    console.log(req.body)
    res.redirect('/')
}) 

module.exports = router