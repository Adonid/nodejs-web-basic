const express = require('express')
const router = express.Router()
const {User} = require('../../../models')
const {notices} = require('../../../common')
const {DriverGoogle} = require('../../../services')


/**
 * Lay thong tin chi tiet nguoi dung
 * 
 * @params {*} email, roleId
 * 
 * @returns {*} object JSON
 * 
 */
router.post('/', async (req, res) => {
    

    // const {imgBase64} = req.body
    // const dataFile = await DriverGoogle.uploadFile(imgBase64)
    
    // if(dataFile){
    //     return res.status(200).json({msg: dataFile})
    // }
    // return res.status(500).json({error: "Uh! Đã có lỗi xảy ra."})

    const {fileId} = req.body
    // const status = await DriverGoogle.deleteFile(fileId)
    // if(status){
    //     return res.status(200).json({msg: "Xóa file thành công!"})
    // }
    // return res.status(500).json({error: "Uh! Đã có lỗi xảy ra."})

    const dataFile = await DriverGoogle.generatePublicUrl(fileId)
    if(dataFile){
        return res.status(200).json({msg: dataFile})
    }
    return res.status(500).json({error: "Uh! Đã có lỗi xảy ra."})
})

module.exports = router