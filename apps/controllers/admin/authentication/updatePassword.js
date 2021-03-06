const express = require('express')
const router = express.Router()
const {notices, bcrypt} = require('../../../common')
const {
    adminMiddleware
} = require('../../../middleware')
const {User} = require('../../../models')

/**
 * XAC MINH TAI KHOAN  & GUI EMAIL CHUA LINK DOI MAT KHAU
 * 
 * @param {email, codeReset, password, repassword}
 * 
 * @return string notifies
 */
router.post('/', adminMiddleware.updatePasswordAdmin, async (req, res) => {
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