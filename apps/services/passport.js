const { Strategy, ExtractJwt } = require('passport-jwt')
const FacebookStrategy = require('passport-facebook')
const config = require('../../config/config.json')
const { User } = require('../models')

/** PASSPORT VOI JWT - dung cho ADMIN & EDITOR
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

/** PASSPORT VOI SOCIAL - dung cho end USER
 * 
 * @param {*} passport 
 * @returns {*} function
 */
const applyPassportFacebookStrategy = passport => {
  var options = {}
  options.clientID = config.facebook.appId
  options.clientSecret = config.facebook.appSecret
  options.callbackURL = config.facebook.callbackUrl
  options.profileFields = ['id', 'displayName', 'photos', 'email'],
  options.passReqToCallback  = true
  
  passport.use( new FacebookStrategy(options, async (req, accessToken, refreshToken, profile, done) => {
      const {name, email} = profile._json
      const id = profile.id
      // Xu ly dang ky | dang nhap tai khoan facebook cho user nay
      return cb(err, false)
    })
  )
}



module.exports = {
  applyPassportStrategy,
  applyPassportFacebookStrategy
}
