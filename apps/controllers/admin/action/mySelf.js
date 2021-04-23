const express = require('express')
const router = express.Router()
const {User} = require('../../../models')
const {notices} = require('../../../common')
const {DriverGoogle} = require('../../../services')
const config = require('../../../../config/config.json')

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
 * POST - cap nhat avatar
 * 
 * @params {user} - nhu trong da Passport tra ve
 * 
 * @returns {} object JSON
 * 
 */
router.post('/update-avatar', async (req, res) => {
    const {user} = req
    const {image} = req.body
    const myself = await User.updateUser(user)
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
 * Upload anh avatar cho Users
 * 
 * @params {emailUser, contentFile, nameFile } contentFile - base64String
 * 
 * @returns {fileId, webContentLink, webViewLink, thumbnailLink} object JSON
 * 
 */
 router.post('/update-avatar', async (req, res) => {
    const {email, roleId, name} = req.user
    const {imageBase64} = req.body
    // PHAI TON TAI USER NAY
    const user = await User.getUser({email, roleId, name})
                            .then(data => data)
                            .catch(err => err)
    if(!user){
        const err = notices._500
        return res.status(err.code).json(err)
    }
    // UPLOAD AVATAR MOI LEN
    const dataFile = await DriverGoogle.uploadFile(config.googledriver.avatarFolder, imageBase64, nameFile||"Example.jpg")
    if(!dataFile){
        const error = notices._500
        return res.status(error.code).json(error)
    }
    // XOA FILE CU NEU CO   
    const {fileId} = user.avatar
    if(fileId){
        const status = await DriverGoogle.deleteFile(fileId)
        // Loi ko xoa duoc
        if(!status){
            const error = notices._500
            return res.status(error.code).json(error)
        }
    }
    // CAP NHAT FILE CHO USER NAY
    const updated = await User.updateUser(
        {avatar: {webViewLink: dataFile.webViewLink, webContentLink: dataFile.webContentLink, thumbnailLink: dataFile.thumbnailLink, fileId: dataFile.fileId}},
        {email}
    )
    if(updated){
        const message = notices._203("Ảnh đại diện", updated)
        return res.status(message.code).json(message)
    }
    const error = notices._500
    return res.status(error.code).json(error)
    // const {fileId} = req.body
    // // const status = await DriverGoogle.deleteFile(fileId)
    // // if(status){
    // //     return res.status(200).json({msg: "Xóa file thành công!"})
    // // }
    // // return res.status(500).json({error: "Uh! Đã có lỗi xảy ra."})

    // const dataFile = await DriverGoogle.generatePublicUrl(fileId)
    // if(dataFile){
    //     return res.status(200).json({msg: dataFile})
    // }
    // return res.status(500).json({error: "Uh! Đã có lỗi xảy ra."})
})



module.exports = router