const express = require('express')
const router = express.Router()
const {User} = require('../../../models')
const {notices} = require('../../../common')
const {
    generalMiddleware
} = require("../../../middleware")

/**
 * GET - Lay thong tin cua chinh toi
 * 
 * @params {user} - nhu trong da Passport tra ve
 * 
 * @returns {} object JSON
 * 
 */
router.get('/', async (req, res) => {
    const {user} = req
    const myself = await User.getUser(user)
                             .then(user => user)
                             .catch(err => err)
    if(myself){
        delete myself.password
        const msg = notices.reqSuccess(myself)
        return res.status(msg.code).json(msg)
    }
    return res.status(notices._500.code).json(notices._500)
})

/** 
 * POST - Upload anh avatar cho Users
 * 
 * @params {email, roleId, name} auto in req. Rassport returned. { imageBase64 } in body
 * 
 */
 router.post('/update-avatar', generalMiddleware.updateAvatar, (req, res) => {})

/**
 *  POST - CAP NHAT THONG TIN CO BAN
 * 
 * @param {name, fullName, phoneNumber, address, provinceId, districtId, communeId}
 * @return {user}
 */
 router.post('/update-basic-info', generalMiddleware.verifyUserBasicInfo, async (req, res) => {
    return res.status(200).json({msg: "OK. Cap nhat di"})
 })

module.exports = router