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
    db.stream.findAll({
        where: { userId: req.user.id }
    }).then(foundStreams => {
        res.render('journal/new', {streams: foundStreams})
    }).catch( err => console.log(err))
})

router.post('/', isLoggedIn, (req, res) => {
    db.trip.create({
        date: req.body.date,
        userId: req.body.userId,
        weather: req.body.weather,
        description: req.body.description,
        streamId: req.body.stream
    }).then(createdTrip => {
        console.log(createdTrip)
        res.redirect('/journal')
    }).catch(err => console.log(err))
    res.redirect('/')
}) 

module.exports = router