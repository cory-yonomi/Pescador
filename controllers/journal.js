require('dotenv').config()
const express = require('express')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()
const db = require('../models')

router.get('/', isLoggedIn, (req, res) => {
    db.trip.findAll({
        where: { userId: req.user.id },
        include: [db.stream]
    }).then((foundTrips) => {
        res.render('journal/journalIndex', {trips: foundTrips})        
    }).catch(err => console.log(err))
})

router.get('/new', isLoggedIn, (req, res) => {
    db.stream.findAll({
        where: { userId: req.user.id }
    }).then(foundStreams => {
        res.render('journal/newTrip', {streams: foundStreams})
    }).catch( err => console.log(err))
})

router.get('/:id', isLoggedIn, (req, res) => {
    db.trip.findOne({
        where: { id: req.params.id },
        include: db.stream
    }).then(foundTrip => {
        res.render('journal/showTrip', {trip: foundTrip})
    }).catch(err => console.log(err))
})

//I need to find a trip by it's ID and all the streams associated with the trip's user
router.get('/:id/edit', isLoggedIn, (req, res) => {
    db.trip.findOne({
        where: { id: req.params.id },
        include: [db.stream, db.user]
    }).then(foundTrip => {
        const trip = foundTrip
        db.stream.findAll({
            where: { userId: req.user.id}
        }).then((foundStreams) => {
            res.render('journal/editTrip', {streams: foundStreams, trip: trip})
        })
    }).catch(err => console.log(err))
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
})

router.put('/:id', isLoggedIn, (req, res) => {
    db.trip.findOne({
        where: { id: req.params.id },
        include: db.stream
    }).then(foundTrip => {
        foundTrip.update({
            date: req.body.date,
            weather: req.body.weather,
            streamId: req.body.streamId,
            fishCaught: req.body.fishCaught,
            description: req.body.description
        }).then(result => {
            res.redirect(`/journal/${ req.params.id }`)
        })
    })
})

router.delete('/:id', isLoggedIn, (req, res) => {
    db.trip.findByPk(req.params.id)
        .then(foundTrip => {
        foundTrip.destroy()
        }).then(result => {
            res.redirect('/journal')
    })
})

module.exports = router