const express = require('express')
const router = express.Router()
const passport = require('passport')
const {JwtStrategy} = require('../../../services')
const {notices} = require('../../../common')

/**
 * Router dung cho Dang nhap hoac dang ky: passport.authenticate('facebook', { scope:'email'})
 * 
 * @params in BODY: { email, password}
 * 
 * @return json
 * 
 * 
 */
router.get('/', passport.authenticate('facebook', { scope:'email'}), async (req, res) => {
    // user la object duoc passport tra ve qua 2 phuong thuc serializeUser  |  deserializeUser trong ham done
    const {user} = req
    // Tra ve MA JWT cho USER
    const token = await JwtStrategy.generateToken(user.email)
    const info = notices.loginSuccess(token)
    return res.status(info.code).json(info)
})



module.exports = router