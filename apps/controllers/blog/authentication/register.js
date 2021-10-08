const express = require('express')
const router = express.Router()
const {userMiddleware} = require("../../../middleware")
const {bcrypt} = require('../../../common')
const {User} = require('../../../models')
const {notices} = require('../../../common')

/**
 *  CONTROLLER TAO TAI KHOAN ADMIN or EDITOR
 * 
 * @param {name, email, password}
 * 
 * @return {msg}
 */
router.post('/', userMiddleware.verifyUserRegister, async (req, res) => {
    const {name, email, password} = req.body
    return res.status(500).json({name, email, password})
    // const hash = bcrypt.hashPassword(password)
    // const created = await User.createAdmin(name, email, hash)
    // if (created!==false) {
    //     return res.status(201).json(notices._201('createManager', 'Đăng ký tài khoản admin'))
    // } else {
    //     return res.status(500).json(notices.duplicationAccount)
    // }
    
})

module.exports = router