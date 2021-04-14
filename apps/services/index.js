const JwtStrategy = require('./jwt')
const Passport  = require('./passport')
const Mailer  = require('./mailer')
const DriverGoogle  = require('./drivergoogle')

module.exports={
    JwtStrategy,
    Passport,
    Mailer,
    DriverGoogle
}