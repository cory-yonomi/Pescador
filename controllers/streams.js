const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')
const isLoggedIn = require('../middleware/isLoggedIn')

router.get('/', isLoggedIn, (req, res) => {
    db.stream.findAll({
        where: { userId: req.user.id },
    }).then((foundStreams) => {
        res.render('streams/streamIndex', {streams: foundStreams})        
    }).catch(err => console.log(err))
})

router.get('/new', isLoggedIn, (req, res) => {
    res.render('streams/newStream')
})

module.exports = router