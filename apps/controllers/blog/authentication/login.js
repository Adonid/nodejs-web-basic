const express = require('express')
const router = express.Router()
const {notices} = require('../../../common')
const {JwtStrategy} = require('../../../services')
const {userMiddleware} = require("../../../middleware")
const { User, Address } = require('../../../models')

/**
 * Router dung cho test cac admin
 * 
 * @param { email, password} in BODY: 
 * 
 * @return json
 * 
 */
router.post('/', userMiddleware.verifyLoginUser, async (req, res) => {
    const {email} = req.body
    // Tra ve MA JWT cho ADMIN
    const token = await JwtStrategy.generateToken(email)
    // Lay thong tin chi tiet user nay
    const myself = await User.getUser({email})
                             .then(user => user)
                             .catch(err => err)
    // Lay toan bo cac tinh/thanh pho
    // const provinces = await Address.getProvinces()
    // Tra ve cho user
    if(token&&myself){
        const info = notices.loginSuccess(token, myself)
        return res.status(info.code).json(info) 
    }
    return res.status(notices._500.code).json(notices._500) 
});

module.exports = router