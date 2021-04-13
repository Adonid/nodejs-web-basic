const express = require('express')
const router = express.Router()
const {User} = require('../../../models')
const {notices} = require('../../../common')


/**
 * Lay thong tin chi tiet nguoi dung
 * 
 * @params {*} email, roleId
 * 
 * @returns {*} object JSON
 * 
 */
router.get('/', async (req, res) => {
    const {email, roleId} = req.body
    const user = await User.getUserDetail(email, roleId)
    if(user){
        const info = notices.reqSuccess(user)
        return res.status(info.code).json(info)
    }
    const err = notices._500
    return res.status(err.code).json(err)
})

module.exports = router