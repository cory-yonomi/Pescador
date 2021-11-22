require('dotenv').config()
const express = require('express')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()
const db = require('../models')

//display all of user's trips
router.get('/', isLoggedIn, (req, res) => {
    db.trip.findAll({
        where: { userId: req.user.id },
        order: [['date', 'DESC']],
        include: [db.stream, db.fish]
    }).then((foundTrips) => {
        res.render('journal/journalIndex', {trips: foundTrips})        
    }).catch(err => console.log(err))
})

//add a new trip form
router.get('/new', isLoggedIn, (req, res) => {
    db.stream.findAll({
        where: { userId: req.user.id }
    }).then(foundStreams => {
        res.render('journal/newTrip', {streams: foundStreams})
    }).catch( err => console.log(err))
})

//display a trip's information
router.get('/:id', isLoggedIn, (req, res) => {
    db.trip.findOne({
        where: { id: req.params.id },
        include: [db.stream, db.fish]
    }).then(foundTrip => {
        console.log(foundTrip.fishes)
        res.render('journal/showTrip', {trip: foundTrip})
    }).catch(err => console.log(err))
})

//edit a trip
router.get('/:id/edit', isLoggedIn, (req, res) => {
    //request specific trip
    db.trip.findOne({
        where: { id: req.params.id },
        include: [db.stream, db.user]
    }).then(foundTrip => {
        //save the trip to be passed down after next query
        const trip = foundTrip
        //find the user's streams
        db.stream.findAll({
            where: { userId: req.user.id}
        }).then((foundStreams) => {
            res.render('journal/editTrip', {streams: foundStreams, trip: trip})
        })
    }).catch(err => console.log(err))
})

//post new trip
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

//post edited trip
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
        }).catch( err => console.log(err))
    })
})

//add a fish form
router.get('/:id/addFish', isLoggedIn, (req, res) => {
    db.trip.findOne({
        where: { id: req.params.id },
        include: db.stream
    }).then(foundTrip => {
        res.render('journal/addFish', {trip: foundTrip})
    })
})

//post a fish
router.post('/:id/fish', isLoggedIn, (req, res) => {
    db.fish.create({
        species: req.body.species,
        length: req.body.length,
        weight: req.body.weight,
        tripId: req.body.tripId,
        streamId: req.body.streamId,
        userId: req.body.userId,
        caughtWith: req.body.caughtWith,
        description: req.body.description
    }).then(result => {
        res.redirect(`/journal/${ req.params.id }`)
    })
})

//delete specific trip
router.delete('/:id', isLoggedIn, (req, res) => {
    db.trip.findByPk(req.params.id)
        .then(foundTrip => {
        foundTrip.destroy()
        }).then(result => {
            res.redirect('/journal')
    }).catch(err => console.log(err))
})

//delete a fish
router.delete('/:id/fish/:fishIdx', isLoggedIn, (req, res) => {
    db.fish.findByPk(req.params.fishIdx)
        .then(foundFish => {
        foundFish.destroy()
        }).then(result => {
            res.redirect(`/journal/${ req.params.id }`)
    }).catch(err => console.log(err))
})

module.exports = router