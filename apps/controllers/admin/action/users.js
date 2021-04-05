const express = require('express')
const router = express.Router()
const {User} = require('../../../models')
const {notices} = require('../../../common')


/**
 * Lay ra danh sach nguoi dung cua trang web
 * 
 * @params {*} 
 * 
 * @returns {*} object JSON
 * 
 */
router.get('/', async (req, res) => {
    const {offset, limit} = req.body
    const users = await User.paginationUser(offset, limit)
    if(users){
        const info = notices.reqSuccess(users)
        return res.status(info.code).json(info)
    }
    const err = notices._500
    return res.status(err.code).json(err)
})

module.exports = router