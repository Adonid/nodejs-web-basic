const express = require('express')
const router = express.Router()
const {User} = require('../../../models')
const {notices, bcrypt} = require('../../../common')
const {
    generalMiddleware
} = require("../../../middleware")

/**
 * GET - Lay thong tin cua chinh toi
 * 
 * @param {user} - nhu trong da Passport tra ve
 * 
 * @returns {user} object JSON
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
 * @param {email, roleId, name} auto in req.user
 * @param {imageBase64} in req.body
 * 
 * @return {user} object JSON
 * 
 */
 router.post('/update-avatar', generalMiddleware.updateAvatar, (req, res) => {})

 /**
 *  POST - CAP NHAT THONG TIN CO BAN
 * 
 * @param {name, fullName, phoneNumber, address, provinceId, districtId, communeId}
 * @return {user}
 */
  router.post('/update-basic-info', generalMiddleware.checkUserBasicInfo, async (req, res) => {
    const {id, email, roleId} = req.user
   const {name, fullName, phoneNumber, bio, address, provinceId, districtId, communeId} = req.body
   const userUpdated = await User.updateUser(
       {name, fullName, phoneNumber, bio, address, provinceId, districtId, communeId},
       {id, email, roleId}
   )
   if(userUpdated){
       const message = notices._203("Thông tin cá nhân", userUpdated)
       return res.status(message.code).json(message)
   }
   const error = notices._500
   return res.status(error.code).json(error)
})

module.exports = router