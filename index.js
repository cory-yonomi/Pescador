require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const methodOverride = require('method-override')
const axios = require('axios')
const db = require('./models')

app.use('/static', express.static('public'))
// views (ejs and layouts) set up
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// body parser middelware
app.use(express.urlencoded({extended:false}))

// session middleware
app.use(session({
    secret: process.env.SUPER_SECRET_SECRET,
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

//overide http methods
app.use(methodOverride('_method'))

// flash middleware (must go AFTER session middleware)
app.use(flash())

// custom middleware
// current user information is generated here and pushed through
// the rest of the routes
app.use((req, res, next) => {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next()
})

// controllers middleware 
app.use('/auth', require('./controllers/auth'))
app.use('/journal', require('./controllers/journal'))
app.use('/streams', require('./controllers/streams'))
app.use('/profile', require('./controllers/profile'))

// entry point, only allows log in
app.get('/', (req, res) => {
    res.render('auth/login')
})

// once logged in, this is homepage
app.get('/home', isLoggedIn, (req, res) => {
    const currentReq = (zip) => {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${process.env.WEATHER_API_KEY}`)
    }

    const forecastReq = (zip) => {
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&cnt=1&units=imperial&appid=${process.env.WEATHER_API_KEY}`)
    }

    Promise.all([currentReq(req.user.zipCode), forecastReq(req.user.zipCode)])
    .then(values => {
        console.log(values[1].data.list[0])
        res.render('home', {current:values[0].data, forecast:values[1].data.list[0]})
    }).catch(err => console.log(err))
})

//activate the server
app.listen(3000, () => {
    console.log("Pescador running on port 3000")
})

// //enter route
// app.get('/', (req, res) => {
//     //query for streams, fish
//     db.user.findOne({
//         where: { id: req.user.id },
//         include: [db.stream, db.fish]
//     })
//         .then(foundUser => {
//             //query weather api for current weather
//             const currentReq = (zip) => {
//                 return axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${process.env.WEATHER_API_KEY}`)
//             }

//             //query weather api for forecast with favorite stream's lat and long
//             const forecastReq = (stream) => {
//                 return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${stream.latitude}&lon=${stream.longitude}&cnt=1&units=imperial&appid=${process.env.WEATHER_API_KEY}`)
//             }

//             return Promise.all([
//                 currentReq(foundUser.zipcode),
//                 forecastReq(foundUser.streams[foundUser.favoriteStream])
//             ])
//         }).then(values => {
//         res.render('/home', )
//     })   
//     //render dashboard with current weather, favorite stream forecast
// })
    