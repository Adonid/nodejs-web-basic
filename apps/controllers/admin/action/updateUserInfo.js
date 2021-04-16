const express = require('express')
const router = express.Router()
const {User} = require('../../../models')
const {notices} = require('../../../common')
const {DriverGoogle} = require('../../../services')
const config = require('../../../../config/config.json')


/**
 * Cap nhat thong tin co ban cho user
 * 
 * @params {folderId, nameFile, contentFile}
 * 
 * @returns {fileId, webContentLink, webViewLink, thumbnailLink} object JSON
 * 
 */
// router.post('/', async (req, res) => {
    

//     const {imgBase64} = req.body
//     const dataFile = await DriverGoogle.uploadFile("16uiB4MYAYWzYQizZKShjErx7nGJq-DcF", "Girl.jpg", imgBase64)
    
//     if(dataFile){
//         return res.status(200).json({msg: dataFile})
//     }
//     return res.status(500).json({error: "Uh! Đã có lỗi xảy ra."})

//     // const {fileId} = req.body
//     // // const status = await DriverGoogle.deleteFile(fileId)
//     // // if(status){
//     // //     return res.status(200).json({msg: "Xóa file thành công!"})
//     // // }
//     // // return res.status(500).json({error: "Uh! Đã có lỗi xảy ra."})

//     // const dataFile = await DriverGoogle.generatePublicUrl(fileId)
//     // if(dataFile){
//     //     return res.status(200).json({msg: dataFile})
//     // }
//     // return res.status(500).json({error: "Uh! Đã có lỗi xảy ra."})
// })

/**
 * Upload anh avatar cho Users
 * 
 * @params {emailUser, contentFile, nameFile } contentFile - base64String
 * 
 * @returns {fileId, webContentLink, webViewLink, thumbnailLink} object JSON
 * 
 */
router.post('/upload-avatar', async (req, res) => {
    const {email, roleId, nameFile, contentFile} = req.body
    // PHAI TON TAI USER NAY
    const user = await User.getUserDetail(email, roleId)
    if(!user){
        const err = notices._500
        return res.status(err.code).json(err)
    }
    // UPLOAD AVATAR MOI LEN
    const dataFile = await DriverGoogle.uploadFile(config.googledriver.avatarFolder, contentFile, nameFile||"Example.jpg")
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

/**
 * Delete - forever anh avatar cho Users
 * 
 * @params {fileId} contentFile - base64String
 * 
 * @returns {fileId, webContentLink, webViewLink, thumbnailLink} object JSON
 * 
 */
router.post('/delete-avatar', async (req, res) => {
    const {fileId} = req.body
    const status = await DriverGoogle.deleteFile(fileId)
    if(status){
        const message = notices._204(status)
        return res.status(message.code).json(message)
    }
    const error = notices._500
    return res.status(error.code).json(error)

    // const dataFile = await DriverGoogle.generatePublicUrl(fileId)
    // if(dataFile){
    //     return res.status(200).json({msg: dataFile})
    // }
    // return res.status(500).json({error: "Uh! Đã có lỗi xảy ra."})
})

module.exports = router