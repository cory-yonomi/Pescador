const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')
const isLoggedIn = require('../middleware/isLoggedIn')

router.get('/', isLoggedIn, (req, res)=>{
    res.render('profile')
})

router.get('/edit', isLoggedIn, (req, res) => {
    res.render('editProfile')
})

router.put('/', isLoggedIn, (req, res) => {
    db.user.findByPk(req.user.id)
        .then(foundUser => {
            foundUser.update({
                zipCode: parseInt(req.body.zipCode),
                style: req.body.style,
                favoriteStream: req.body.favoriteStream,
                email: req.body.email
            }).then(() => {
            res.redirect('/')
        })
    })
})

module.exports = router