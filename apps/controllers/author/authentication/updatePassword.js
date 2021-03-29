const express = require('express')
const router = express.Router()
const {notices, bcrypt} = require('../../../common')
const {
    editorMiddleware
} = require('../../../middleware')
const {User} = require('../../../models')

/**
 * XAC MINH TAI KHOAN  & GUI EMAIL CHUA LINK DOI MAT KHAU
 * 
 * @params {email, codeReset, password, repassword}
 * 
 * @returns string notifies
 */
router.post('/', editorMiddleware.updatePasswordEditor, async (req, res) => {
    // Du lieu CLEAR
    const {email, codeReset, password} = req.body
    const hash = bcrypt.hashPassword(password)
    const updated = await User.updateUser({password: hash, codeReset: null}, {email, codeReset}, {email})
    if (updated) {
        // Gui EMAIL thong bao cap nhat mat khau thanh cong neu can
        return res.status(201).json(notices._201('reset-password', 'Cập nhật mật khẩu'))
    } else {
        return res.status(500).json(notices._500)
    }
    
})

module.exports = router