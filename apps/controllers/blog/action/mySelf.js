const express = require('express')
const router = express.Router()
const config = require('../../../../config/config.json')
const {User, ImageUser} = require('../../../models')
const {ImageMannager} = require('../../../services')
const {notices} = require('../../../common')
const {Slug, Random} = require('../../../helpers')
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
        const msg = notices.reqSuccess(myself)
        return res.status(msg.code).json(msg)
    }
    return res.status(notices._500.code).json(notices._500)
})

/** 
 * POST - Upload anh avatar cho Users
 * 
 * @param {email, roleId, name} = req.user
 * 
 */
 router.post('/upload-avatar-image', generalMiddleware.checkUpdateImage, async (req, res) => {
    const {imageBase64} = req.body
    const user = req.user
    const indexImage = {userId: user.id, type: config.image.typeAvatar}
    const folderOriginal = config.image.avatarOriginal
    const folderThumbnail = config.image.avatarThumbnail
    const fileName = Slug.slugNameImage(user.name+"-"+Random.makeCodeReset(2))
    const values = {original: folderOriginal+fileName, thumbnail: folderThumbnail+fileName, name: user.name}
    const newImage = {...values, ...indexImage }
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
       // Tra ve thong tin user
       // Lay thong tin chi tiet user nay
       const myself = await User.getUser(user)
                               .then(user => user)
                               .catch(err => err)

       const message = notices._203("Ảnh avatar", myself)
       return res.status(message.code).json(message)
    } catch (error) {
       console.log(error)
       return res.status(notices._500.code).json(notices._500)
    }
})

/** 
 * POST - Upload anh background cho Users. 
 * 
 * Anh background chi co origin ko co thumbnail vi no la anh lon
 * 
 * @param {email, roleId, name} req.user
 * 
 */
 router.post('/upload-background-image', generalMiddleware.checkUpdateImage, async (req, res) => {
    const {imageBase64} = req.body
    const user = req.user
    const indexImage = {userId: user.id, type: config.image.typeBackground}
    const folderOriginal = config.image.bgOriginal
    const fileName = Slug.slugNameImage(user.name+"-"+Random.makeCodeReset(2))
    const values = {original: folderOriginal+fileName, name: user.name}
    const newImage = {...values, ...indexImage }
    try {
       // Lay anh background da luu
       const {original} = await ImageUser.getImage(indexImage)
       // Xoa file neu da ton tai
       if(original)
           ImageMannager.removeFileIfExists(original)
       // Tai len anh goc original
       await ImageMannager.saveOriginal(folderOriginal, fileName, imageBase64)
       // Lua vao DB thoi
       if(original){
           // CAP NHAT
           await ImageUser.updateImage(values, indexImage)
       }
       else{
           // TAO MOI
           await ImageUser.createImage(newImage)
       }
       // Tra ve thong tin user
       // Lay thong tin chi tiet user nay
       const myself = await User.getUser(user)
                               .then(user => user)
                               .catch(err => err)

       const message = notices._203("Ảnh nền", myself)
       return res.status(message.code).json(message)
    } catch (error) {
       console.log(error)
       return res.status(notices._500.code).json(notices._500)
    }
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

       const message = notices._203("Thông tin cá nhân", myself)
       return res.status(message.code).json(message)
   }
   return res.status(notices._500.code).json(notices._500)
})

module.exports = router