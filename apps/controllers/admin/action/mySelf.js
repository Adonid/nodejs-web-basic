const express = require('express')
const router = express.Router()
const path = require('path')
const config = require('../../../../config/config.json')
const {User, ImageUser} = require('../../../models')
const {ImageMannager} = require('../../../services')
const {notices, bcrypt} = require('../../../common')
const {Slug, Random} = require('../../../helpers')
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
 router.post('/upload-avatar-image', generalMiddleware.checkUpdateImage, async (req, res) => {
     const {imageBase64} = req.body
     const user = req.user
     const indexImage = {userId: user.id, type: config.image.typeAvatar}
     const folderOriginal = config.image.avatarOriginal
     const folderThumbnail = config.image.avatarThumbnail
     const fileName = Slug.slugNameImage(user.name+"-"+Random.makeCodeReset(2))
     const values = {original: folderOriginal+fileName, thumbnail: folderThumbnail+fileName}
     const newImage = {...values, ...indexImage, name: user.name }
     try {
        // Lay anh avatar da luu
        const {original, thumbnail} = await ImageUser.getImage(indexImage)
        // Xoa het file neu da ton tai
        if(original)
            ImageMannager.removeFileIfExists(original)
        if(thumbnail)
            ImageMannager.removeFileIfExists(thumbnail)
        // Tai len anh goc original
        await ImageMannager.saveOriginal(folderOriginal, fileName, imageBase64)
        // Convert anh nay qua thumbnail
        await ImageMannager.saveThumbnail(folderThumbnail, fileName, folderOriginal+fileName)
        // Lua vao DB thoi
        if(original){
            // CAP NHAT
            await ImageUser.updateImage(values, indexImage)
        }
        else{
            // TAO MOI
            await ImageUser.createImage(newImage)
        }
     } catch (error) {
         console.log(error)
     }
     const msg = notices.reqSuccess("Middleware thanh cong anh updload!")
     return res.status(msg.code).json(msg)
 })


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