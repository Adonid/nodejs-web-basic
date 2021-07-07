const express = require('express')
const router = express.Router()
const {notices} = require('../../../common')
const {JwtStrategy} = require('../../../services')

const {
    adminMiddleware
} = require("../../../middleware")
const { User } = require('../../../models')

/**
 * Router dung cho test cac admin
 * 
 * @param { email, password} in BODY: 
 * 
 * @return json
 * 
 */
router.post('/', adminMiddleware.verifyLoginAdmin, async (req, res) => {
    const {email} = req.body
    // Tra ve MA JWT cho ADMIN
    const token = await JwtStrategy.generateToken(email)
    const myself = await User.getUser({email})
                             .then(user => user)
                             .catch(err => err)
    if(myself)
        delete myself.password
    if(token && myself){
        const info = notices.loginSuccess(token, myself)
        return res.status(info.code).json(info) 
    }
    return res.status(notices._500.code).json(notices._500) 
});

module.exports = router