const { Strategy, ExtractJwt } = require('passport-jwt')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const TwitterStrategy = require('passport-twitter').Strategy
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
      if(user) {
        return done(null, {
          email: user.email,
          name: user.name,
          id: user[config.underscoreId],
          roleId: user.roleId
        })
      }
      return done(null, false, {msg: "Uh, bạn đăng nhập trước đã nhé!"})
    })
  )
}

/** PASSPORT VOI SOCIAL FACEBOOK - dung cho end USER
 * 
 * @param {*} passport 
 * @returns {*} function
 */
const applyPassportFacebookStrategy = passport => {
  var options = {}
  options.clientID = config.facebook.clientID
  options.clientSecret = config.facebook.clientSecret
  options.callbackURL = config.facebook.callbackURL
  options.profileFields = ['id', 'displayName', 'photos', 'email'],
  options.passReqToCallback  = true
  
  passport.use( new FacebookStrategy(options, async (req, accessToken, refreshToken, profile, done) => {
      const provider = "facebook"
      const id = profile.id
      const {name, email} = profile._json
      const profile_picture = profile._json.picture.data.url
      const meta = {
        provider,
        id,
        token: accessToken
      }
      // Xu ly dang ky | dang nhap tai khoan facebook cho user nay
      const existing_user = await User.getUser({email})
                                    .then(data => data)
                                    .catch(err=>err)
      // Xem email nay dang ky chua
      if(existing_user){
        // Day la email ma Admin hoac Editor da dang ky roi, khong cho phep vao lop ung dung nay
        if(existing_user.roleId===1 || existing_user.roleId===2 || existing_user.provider!==provider){
          return done(null, false, {msg: "Uh! Email của tài khoản này đã được đăng ký rồi"})
        }
        // Cho phep dang nhap vao
        return done(null, {
          email: existing_user.email,
          _id: existing_user[config.underscoreId]
        })
      }
      // Neu email chua co nguoi dang ky thi thuc hien dang ky tk cho user
      const new_user = await User.createUser({provider, name, email, profile_picture, meta})
      console.log(new_user)
      if(!new_user){
        // Tra ve loi
        return done(null, false, {msg: "Uh! Đã xảy ra lỗi"})
      }
      // Tra ve user moi dang ky
      console.log("Dang ky xong")
      return done(null, {
        email: new_user.email,
        _id: new_user[config.underscoreId]
      })
    })
  )
}

/** PASSPORT VOI SOCIAL GOOGLE - dung cho end USER
 * 
 * @param {*} passport 
 * @returns {*} function
 */
const applyPassportGoogleStrategy = passport => {
  var options = {}
  options.clientID = config.google.clientID
  options.clientSecret = config.google.clientSecret
  options.callbackURL = config.google.callbackURL
  
  passport.use( new GoogleStrategy(options, async (accessToken, refreshToken, profile, done) => {
      const provider = "google"
      const id = profile.id
      const {name, email, picture} = profile._json
      // const profile_picture = profile._json.picture.data.url
      const meta = {
        provider,
        id,
        token: accessToken
      }
      // Xu ly dang ky | dang nhap tai khoan facebook cho user nay
      const existing_user = await User.getUser({email})
                                    .then(data => data)
                                    .catch(err=>err)
      // Xem email nay dang ky chua
      if(existing_user){
        // Day la email ma Admin hoac Editor da dang ky roi, khong cho phep vao lop ung dung nay
        if(existing_user.roleId===1 || existing_user.roleId===2 || existing_user.provider!==provider){
          return done(null, false, {msg: "Uh! tài khoản này đã được đăng ký rồi"})
        }
        // Cho phep dang nhap vao
        return done(null, {
          email: existing_user.email,
          _id: existing_user[config.underscoreId]
        })
      }
      // Neu email chua co nguoi dang ky thi thuc hien dang ky tk cho user
      const new_user = await User.createUser({provider, name, email, profile_picture: picture, meta})
      if(!new_user){
        // Tra ve loi
        return done(null, false, {msg: "Uh! Đã xảy ra lỗi"})
      }
      // Tra ve user moi dang ky
      return done(null, {
        email: new_user.email,
        _id: new_user[config.underscoreId]
      })
    })
  )
}

/** PASSPORT VOI SOCIAL GOOGLE - dung cho end USER
 * 
 * @param {*} passport 
 * @returns {*} function
 */
const applyPassportTwitterStrategy = passport => {
  var options = {}
  options.consumerKey = config.twitter.clientID
  options.consumerSecret = config.twitter.clientSecret
  options.callbackURL = config.twitter.callbackURL
  
  passport.use( new TwitterStrategy(options, async (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      const provider = "twitter"
      const id = profile.id
      const {name, email, picture} = profile._json
      // const profile_picture = profile._json.picture.data.url
      const meta = {
        provider,
        id,
        token: accessToken
      }
      // Xu ly dang ky | dang nhap tai khoan facebook cho user nay
      const existing_user = await User.getUser({email})
                                    .then(data => data)
                                    .catch(err=>err)
      // Xem email nay dang ky chua
      if(existing_user){
        // Day la email ma Admin hoac Editor da dang ky roi, khong cho phep vao lop ung dung nay
        if(existing_user.roleId===1 || existing_user.roleId===2 || existing_user.provider!==provider){
          return done(null, false, {msg: "Uh! tài khoản này đã được đăng ký rồi"})
        }
        // Cho phep dang nhap vao
        return done(null, {
          email: existing_user.email,
          _id: existing_user[config.underscoreId]
        })
      }
      // Neu email chua co nguoi dang ky thi thuc hien dang ky tk cho user
      const new_user = await User.createUser({provider, name, email, profile_picture: picture, meta})
      if(!new_user){
        // Tra ve loi
        return done(null, false, {msg: "Uh! Đã xảy ra lỗi"})
      }
      // Tra ve user moi dang ky
      return done(null, {
        email: new_user.email,
        _id: new_user[config.underscoreId]
      })
    })
  )
}



module.exports = {
  applyPassportStrategy,
  applyPassportFacebookStrategy,
  applyPassportGoogleStrategy,
  applyPassportTwitterStrategy
}
