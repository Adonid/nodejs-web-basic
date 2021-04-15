// Core express
const express = require('express')
// Config info
const config = require(__dirname+'/config/config.json')
// Use for route & controller
const controllers = require(__dirname + '/apps/controllers')
// Use passport
const passport = require('passport')
const {Passport} = require(__dirname+'/apps/services')
// Use express
const app = express()

// Passport session setup.
passport.serializeUser((user, done) => done(null, user))
  
passport.deserializeUser((obj, done) => done(null, obj))

app.use(passport.initialize())
// Dua passport vao su dung
Passport.applyPassportStrategy(passport)
// Dua passport-facebook vao login cho user cuoi
Passport.applyPassportFacebookStrategy(passport)
// Dua passport-google-oauth vao login cho user cuoi
Passport.applyPassportGoogleStrategy(passport)
// Dua passport-twitter vao login cho user cuoi
Passport.applyPassportTwitterStrategy(passport)
// Dua req ve dang json va chi lam viec voi json - toi da cua request la 5Mb
app.use(express.json({limit: '5mb'}))
// Cau hinh file static
app.use('/static', express.static(__dirname + "/public"))
//
app.set("views", "./views");
app.set("view engine", "pug");
// them vao app cac route & controller
app.use(controllers)

// lang nghe cong ket noi
const host = config.server.host||"http://localhost"
const port = config.server.port||3000
app.listen(port, host, () => {
    console.log("Serve is running on port " +port)
})