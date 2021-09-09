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
<<<<<<< HEAD
 router.post('/update-avatar', generalMiddleware.updateAvatar, (req, res) => {})
=======
//  router.post('/update-avatar', generalMiddleware.updateAvatar, (req, res) => {})
>>>>>>> admin

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

 /**
  *   POST - DOI MAT KHAU
  *   @param {password, newPassword, rePassword}
  *   @return {user}
  */
 router.post('/update-password', generalMiddleware.checkUpdatePassword, async (req, res) => {
    const {id, email, roleId} = req.user
    const {newPassword} = req.body
    const password = bcrypt.hashPassword(newPassword)
    await User.updateUser(
        {password},
        {id, email, roleId} 
    )
    const msg = notices._201("Đổi mật khẩu")
    return res.status(msg.code).send(msg)
 })

module.exports = router