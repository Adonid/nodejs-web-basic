const express = require('express')
const router = express.Router()
const {User} = require('../../../models')
const {notices} = require('../../../common')


/**
 * Lay ra danh sach nguoi dung cua trang web
 * 
 * ALL AUTHORS & LIMIT USERS
 * 
 * @param {offset, limit} = body
 * 
 * @returns {*} object JSON
 * 
 */
router.get('/', async (req, res) => {
    const {offset, limit} = req.body
    try {
        const authors = await User.paginationEditor()
        const users = await User.paginationUser(offset, limit)
        const info = notices.reqSuccess([authors, users])
        return res.status(info.code).json(info)
    } catch (error) {
        // console.log(error)
        return res.status(notices._500.code).json(notices._500)
    }
})

/**
 * PHAN TRANG CHO USER - VI USER NHIEU NGUOI HON
 * 
 * ALL AUTHORS & LIMIT USERS
 * 
 * @param {offset, limit} = body
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