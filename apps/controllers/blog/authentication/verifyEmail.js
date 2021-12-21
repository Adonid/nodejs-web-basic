const express = require('express')
const router = express.Router()
const {notices} = require('../../../common')
const {userMiddleware} = require("../../../middleware")
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
router.post('/', userMiddleware.verifyEmailForgetPassword, async (req, res) => {
    const {email} = req.body
    const codeReset = Random.makeCodeReset(6, true)
    const update = await User.updateUser({codeReset}, {email})
    if (update) {
        // Gui email chua codereset
        const isSendMail = await Mailer.sendMail(email, `Mã xác thực là ${codeReset}. Không cung cấp mã này cho người khác!`, ResetPassword.contentMail({codeReset}))
        if(isSendMail)
            return res.status(201).json(notices.resetCodeSuccess(email))
        else
            return res.status(notices._500.code).json(notices._500)
    } else {
        return res.status(notices._500.code).json(notices._500)
    }
})

module.exports = router