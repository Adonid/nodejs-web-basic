const express = require('express')
const router = express.Router()
const {notices} = require('../../../common')
// const {JwtStrategy} = require('../../../services')


/**
 * Router dung cho test cac admin
 * 
 * @params in BODY: { email, password}
 * 
 * @return json
 * 
 */
router.post('/',  async (req, res) => {
    const {email} = req.body
    // Tra ve MA JWT cho ADMIN
    // const token = await JwtStrategy.generateToken(email)
    const info = notices.loginSuccess(email)
    return res.status(info.code).json(info)
});

module.exports = router