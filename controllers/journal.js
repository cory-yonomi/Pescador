const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')
const isLoggedIn = require('../middleware/isLoggedIn')

router.get('/', isLoggedIn, (req, res) => {
    db.trip.findAll({
        where: {
            userId: currentUser.id
        },
        include: [db.stream, db.weather]
    }).then((trips) => {
        res.render('journal/index', {trips: trips})        
    })
    // console.log(req.user.id)
    // res.render('journal/index')
})

router.get('/new', isLoggedIn, (req, res) => {
    res.render('journal/new')
})

module.exports = router