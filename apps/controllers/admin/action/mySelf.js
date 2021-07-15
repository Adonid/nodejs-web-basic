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
 * @param {email, roleId, name} auto in req. Rassport returned. { imageBase64 } in body
 * 
 */
 router.post('/update-avatar', generalMiddleware.updateAvatar, (req, res) => {})

/**
 *  POST - CAP NHAT THONG TIN CO BAN
 * 
 * @param {payload}
 * @return {user}
 */
 router.post('/update-basic-info', generalMiddleware.checkUserBasicInfo, async (req, res) => {
     const {id, email, roleId} = req.user
    const payload = req.body
    const userUpdated = await User.updateUser(
        payload,
        {id, email, roleId}
    )
    if(userUpdated){
        // Lay thong tin chi tiet user nay
        const myself = await User.getUser({email})
                                .then(user => user)
                                .catch(err => err)
        delete myself.password

        const message = notices._203("Thông tin cá nhân", myself)
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