const express = require('express')
const router = express.Router()
const {User} = require('../../../models')
const {notices} = require('../../../common')
const {DriverGoogle} = require('../../../services')
const config = require('../../../../config/config.json')

/**
 * GET - Lay thong tin cua chinh toi
 * 
 * @params {cookie}
 * 
 * @returns {} object JSON
 * 
 */
router.get('/', async (req, res) => {
    const {headers, user} = req
    // console.log(req)
    return res.status(200).json({msg: "Done!", authorization: headers.authorization, user})

    // const dataFile = await DriverGoogle.generatePublicUrl(fileId)
    // if(dataFile){
    //     return res.status(200).json({msg: dataFile})
    // }
    // return res.status(500).json({error: "Uh! Đã có lỗi xảy ra."})
})

module.exports = router