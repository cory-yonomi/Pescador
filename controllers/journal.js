const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')
const isLoggedIn = require('../middleware/isLoggedIn')

router.get('/', isLoggedIn, (req, res) => {
    // db.trip.findAll({
    //     where: {
    //         userId: currentUser
    //     },
    //     include: [db.stream, db.weather]
    // })
    // res.render('journal/index')
    console.log(req.user.id)
    res.send('journal')
})

router.get('/new', isLoggedIn, (req, res) => {
    res.render('journal/new')
})

module.exports = router