const db = require('./models')
const trip = require('./models/trip')
const stream = require('./models/stream')

// db.stream.create({
//     name: 'Pedernales River',
//     userId: 1,
//     longitude: 30.271374,
//     latitude: -98.545725,
// }).then(createdStream => {
//     console.log(createdStream)
//     process.exit()
// }).catch(err => {
//     console.log(err)
// })

// db.stream.create({
//     name: 'San Gabriel River',
//     userId: 1,
//     longitude: 30.629001,
//     latitude: -97.473045,
// }).then(createdStream => {
//     console.log(createdStream)
//     process.exit()
// }).catch(err => {
//     console.log(err)
// })

db.stream.create({
    name: 'Brushy Creek',
    userId: 1,
    longitude: 30.530679,
    latitude: -97.589800,
}).then(createdStream => {
    console.log(createdStream)
    process.exit()
}).catch(err => {
    console.log(err)
})

db.trip.create({
    userId: 1,
    streamId: 1,
    date: '11/11/2021',
    weather: 'Overcast, cool, breezy',
    description: 'Did not see many fish, but made a few casts and found success on the very edges, carp were well into the overhanging bank.',
    fishCaught: 1,
}).then(createdTrip => {
    console.log(createdTrip)
    process.exit()
}).catch(err => console.log(err))