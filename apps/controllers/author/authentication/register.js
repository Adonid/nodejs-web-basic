const express = require('express')
const router = express.Router()
const {
    generalMiddleware
} = require("../../../middleware")
const {bcrypt} = require('../../../common')
const {User} = require('../../../models')
const {notices} = require('../../../common')

/**
 *  CONTROLLER TAO TAI KHOAN ADMIN or EDITOR
 * 
 * @params {name, email, password}
 * 
 * @returns msg
 */
router.post('/', generalMiddleware.register, async (req, res) => {
    const {name, email, password} = req.body
    const hash = bcrypt.hashPassword(password)
    const created = await User.createAdmin(name, email, hash)
    if (created!==false) {
        return res.status(201).json(notices._201('createManager', 'Đăng ký tài khoản admin'))
    } else {
        return res.status(500).json(notices._500)
    }
    
})

module.exports = router