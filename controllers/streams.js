const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')
const isLoggedIn = require('../middleware/isLoggedIn')

//show users streams
router.get('/', isLoggedIn, (req, res) => {
    db.stream.findAll({
        where: { userId: req.user.id },
    }).then((foundStreams) => {
        res.render('streams/streamIndex', {streams: foundStreams})        
    }).catch(err => console.log(err))
})

//add a new stream
router.get('/new', isLoggedIn, (req, res) => {
    res.render('streams/newStream')
})

//display an individual streams info
router.get('/:id', isLoggedIn, (req, res) => {
    db.stream.findByPk(req.params.id)
    .then(foundStream => {
    res.render('streams/showStream', { stream: foundStream})
    }).catch( err => console.log(err))
})

//edit a stream display
router.get('/:id/edit', isLoggedIn, (req, res) => {
    db.stream.findByPk(req.params.id)
    .then(foundStream => {
    res.render('streams/editStream', { stream: foundStream})
    }).catch( err => console.log(err))
})

//edit a stream update db and redirect
//requires method override with PUT
router.put('/:id', isLoggedIn, (req, res) => {
    //call to db for stream info
    db.stream.findByPk(req.params.id)
        .then(foundStream => {
            console.log('before update:\n', foundStream)
            //update that shit
            foundStream.update({
                name: req.body.name,
                longitude: req.body.longitude,
                latitude: req.body.latitude
            })
            .then(result => {
            //redirect to edited stream page
            res.redirect(`/streams/${req.params.id}`)
        })    
    }).catch(err => console.log(err))
})

//create new stream in db and redirect
router.post('/', isLoggedIn, (req, res) => {
    db.stream.create({
        name: req.body.name,
        userId: req.body.userId,
        longitude: req.body.longitude,
        latitude: req.body.latitude
    }).then(createdStream => {
        console.log(createdStream)
        res.redirect('/streams')
    }).catch(err => console.log(err))
})

//delete a stream and redirect
router.delete('/:id', isLoggedIn, (req, res) => {
    db.stream.findByPk(req.params.id)
        .then(foundStream => {
        foundStream.destroy()
        }).then(result => {
            console.log(result)
            res.redirect('/streams/')
    }).catch(err => console.log(err))
})

module.exports = router