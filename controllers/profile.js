const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')
const isLoggedIn = require('../middleware/isLoggedIn')

const userReq = userId => {
    return db.user.findOne({
        where: { id: userId },
        include: [db.stream, db.trip, db.fish]
    })
}

const findFavWater = favId => {
    return db.stream.findByPk(favId)
}

// display profile page
router.get('/', isLoggedIn, (req, res) => {
    Promise.all([
        userReq(req.user.id),
        findFavWater(req.user.favoriteStream)
    ])
    .then(foundUser => {
        console.log(req.user)
        res.render('profile', {user: foundUser[0], favStream: foundUser[1]})        
    })
})

// edit profile form
router.get('/edit', isLoggedIn, (req, res) => {
    db.user.findOne({
        where: { id: req.user.id },
        include: [db.stream, db.trip, db.fish]
    }).then(foundUser => {
        console.log(foundUser)
        res.render('editProfile', {user: foundUser})        
    })
})

// edit profile put
router.put('/', isLoggedIn, (req, res) => {
    //find user
    db.user.findByPk(req.user.id)
        .then(foundUser => {
            //update user
            foundUser.update({
                zipCode: req.body.zipCode,
                style: req.body.style,
                favoriteStream: req.body.favoriteStream,
                email: req.body.email
            }).then(() => {
            res.redirect('profile')
        })
    })
})

module.exports = router