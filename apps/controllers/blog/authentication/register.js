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
    const hash = bcrypt.hashPassword(password)
    try {
        await User.createUserWithEmailPassword(name, email, hash)
        return res.status(201).json(notices._201('user', 'Đăng ký tài khoản'))
    } catch (error) {
        console.log(error)
        return res.status(notices._500.code).json(notices._500)
    }
    
})

module.exports = router