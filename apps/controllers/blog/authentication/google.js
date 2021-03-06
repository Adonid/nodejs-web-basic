const express = require('express')
const router = express.Router()
const passport = require('passport')
const {JwtStrategy} = require('../../../services')
const {notices} = require('../../../common')

/**
 * Day la middleware dung cho Dang nhap hoac dang ky
 * 
 * @params middleware
 * 
 * @return null
 * 
 * 
 */
router.get('/', passport.authenticate('google', { scope: ['profile', 'email']}))

/**
 * Router luu thong tin user duoc tra ve tu route tren
 * 
 * @params in BODY: { email, password}
 * 
 * @return json
 * 
 * 
 */
router.get('/callback', passport.authenticate('google'), async (req, res) => {
    // user la object duoc passport tra ve qua 2 phuong thuc serializeUser  |  deserializeUser trong ham done
    const {user} = req
    // Tra ve MA JWT cho USER
    const token = await JwtStrategy.generateToken(user.email)
    const info = notices.loginSuccess(token)
    return res.status(info.code).json(info)
})





module.exports = router