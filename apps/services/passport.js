const { Strategy, ExtractJwt } = require('passport-jwt')
const FacebookStrategy = require('passport-facebook')
const config = require('../../config/config.json')
const { User } = require('../models')

/**
 * 
 * @param {*} passport 
 * @returns {*} function
 */
const applyPassportStrategy = passport => {
  var options = {}
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  options.secretOrKey = config.passport.secret
  passport.use( new Strategy(options, async (payload, done) => {
      const user = await User.getUser({email: payload.email, id: payload.id, roleId: payload.roleId})
                      .then(data => data)
                      .catch(err=>err)
      if (user) {
        return done(null, {
          email: user.email,
          _id: user[config.underscoreId]
        })
      }
      return done(null, false, {msg: "Uh, bạn đăng nhập trước đã nhé!"})
    })
  )
}

/**
 * 
 * @param {*} passport 
 * @returns {*} function
 */
const applyPassportFacebookStrategy = passport => {
  var options = {}
  options.clientID = config.facebook.appId
  options.clientSecret = config.facebook.appSecret
  options.callbackURL = config.facebook.callbackUrl
  // options.enableProof = true
  
  passport.use( new FacebookStrategy(options, async (accessToken, refreshToken, profile, cb) => {
      console.log(accessToken, refreshToken, profile, cb)
      return cb(err, false)
    })
  )
}



module.exports = {
  applyPassportStrategy,
  applyPassportFacebookStrategy
}
