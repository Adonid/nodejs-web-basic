const express = require('express')
const router = express.Router()
const {notices} = require('../../../common')
const {JwtStrategy} = require('../../../services')

const {
    adminMiddleware
} = require("../../../middleware")

/**
 * Router dung cho test cac admin
 * 
 * @params in BODY: { email, password}
 * 
 * @return json
 * 
 */
router.post('/', adminMiddleware.login, async (req, res) => {
    const {email} = req.body
    // Tra ve MA JWT cho ADMIN
    const token = await JwtStrategy.generateToken(email)
    const info = notices.loginSuccess(token)
    return res.status(info.code).json(info)
});

module.exports = router