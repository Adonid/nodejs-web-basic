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
        // Dem so luong
        const amountAuthors = await User.countPeople({roleId: 2})
        const amountUsers = await User.countPeople({roleId: 3})
        const amountBlock = await User.countPeople({active: false})
        const amountMember = await User.countPeople({member: true})
        const resuft = notices.reqSuccess({authors, users, amountAuthors, amountUsers, amountBlock, amountMember})
        return res.status(resuft.code).json(resuft)
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
router.get('/users', async (req, res) => {
    const {offset, limit} = req.body
    try {
        const users = await User.paginationUser(offset, limit)
        const resuft = notices.reqSuccess(users)
        return res.status(resuft.code).json(resuft)
    } catch (error) {
        // console.log(error)
        return res.status(notices._500.code).json(notices._500)
    }
})

module.exports = router