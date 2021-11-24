const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')
const isLoggedIn = require('../middleware/isLoggedIn')
const axios = require('axios')


const currentReq = (zip) => {
    if (!zip) {
        return []
    } else {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${process.env.WEATHER_API_KEY}`)
    }
}

const forecastReq = (zip) => {
    if (!zip) {
        return []
    } else {
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&cnt=1&units=imperial&appid=${process.env.WEATHER_API_KEY}`)
    }
}

const userTripsReq = userID => {
    return db.trip.findAll({
        where: { userId: userID },
        order: [['date', 'DESC']],
        include: [db.user, db.stream, db.fish]
    })
}

const windDirection = deg => {
    const val = Math.floor((deg / 22.5) + 0.5)
    const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    return arr[(val % 16)]
}

// once logged in, this is homepage
router.get('/', isLoggedIn, (req, res) => {
    Promise.all([
        currentReq(req.user.zipCode),
        forecastReq(req.user.zipCode),
        userTripsReq(req.user.id)
    ])
        .then(values => {
            if (values[0].length === 0 || values[1].length === 0) {
                res.render('home', { current: [] })
            } else {
                const winds = {
                    currentWind: windDirection(values[0].data.wind.deg),
                    forecastWind: windDirection(values[1].data.list[0].wind.deg)
                }
                res.render('home', { current: values[0].data, forecast: values[1].data.list[0], trips: values[2], winds: winds})
            }
        })
        .catch(err => console.log(err))
})

module.exports = router