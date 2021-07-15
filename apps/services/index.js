const JwtStrategy = require('./jwt')
const Passport  = require('./passport')
const Mailer  = require('./mailer')
const DriverGoogle  = require('./drivergoogle')
const ImageMannager  = require('./uploadImage')

module.exports={
    JwtStrategy,
    Passport,
    Mailer,
    DriverGoogle,
    ImageMannager
}