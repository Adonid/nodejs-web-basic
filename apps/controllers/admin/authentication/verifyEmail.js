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
 * @param {email}
 * 
 * @return string notifies
 */
router.post('/', adminMiddleware.verifyEmailAdmin, async (req, res) => {
    const {email} = req.body
    const codeReset = Random.makeCodeReset(5)
    const update = await User.updateUser({codeReset}, {email})
    if (update) {
        // Gui email chua codereset
        const isSendMail = await Mailer.sendMail(email, `${codeReset} là mã xác minh thay đổi mật khẩu của bạn - Xin chào ${update.name || update.fullName}! một yêu cầu khôi phục mật khẩu được yêu cầu từ bạn`, ResetPassword.contentMail({codeReset}))
        if(isSendMail)
            return res.status(201).json(notices.resetCodeSuccess(email))
        else
            return res.status(notices._500.code).json(notices._500)
    } else {
        return res.status(notices._500.code).json(notices._500)
    }
})

module.exports = router