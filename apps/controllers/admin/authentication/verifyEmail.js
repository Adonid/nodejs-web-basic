const express = require('express')
const router = express.Router()
const {notices} = require('../../../common')
const {
    adminMiddleware
} = require('../../../middleware')
const {User} = require('../../../models')
const {Random} = require('../../../helpers')
const {Mailer} = require('../../../services')
const {ResetPassword} = require('../../../../views')

/**
 * XAC MINH TAI KHOAN  & GUI EMAIL CHUA LINK DOI MAT KHAU
 * 
 * @params email
 * 
 * @returns string notifies
 */
router.post('/', adminMiddleware.verifyEmailAdmin, async (req, res) => {
    const {email} = req.body
    const codeReset = Random.makeCodeReset(5)
    const update = await User.updateUser({codeReset}, {email})
    if (update) {
        // Gui email chua codereset
        const isSendMail = await Mailer.sendMail(email, `Xin chào ${update.name || update.fullName}! Mã xác minh thay đổi mật khẩu của bạn`, ResetPassword.contentMail({codeReset}))
        if(isSendMail)
            return res.status(201).json(notices.resetCodeSuccess(email))
        else
            return res.status(500).json(notices._500)
    } else {
        return res.status(500).json(notices._500)
    }
})

module.exports = router