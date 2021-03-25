const { Strategy, ExtractJwt } = require('passport-jwt')
const config = require('../../config/config.json')
const { User } = require('../../models')

const applyPassport = () => {
    var options = {}
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    options.secretOrKey = config.passport.secret
    return new Strategy(options, async (payload, done) => {
      const user = await User.getUser({email: payload.email})
                      .then(data => data)
                      .catch(err=>err)
      console.log(user)
      if (user) {
        return done(null, {
          email: user.email,
          _id: user[config.underscoreId]
        })
      }
      return done(null, false)
    })
}

module.exports={
    applyPassport
}