const express = require('express')
const router = express.Router()
const {
    adminMiddleware
} = require('../../../middleware')
const {User} = require('../../../models')
const {Random} = require('../../../helpers')

/**
 * XAC MINH TAI KHOAN  & GUI EMAIL CHUA LINK DOI MAT KHAU
 * 
 * @params email
 * 
 * @returns 
 */
router.post('/', adminMiddleware.verifyEmail, async (req, res) => {
    const {email} = req.body
    const codeReset = Random.makeCodeReset(8)
    const update = await User.updateUser({codeReset}, {email})
    if (update!==false) {
        // Gui email chua codereset
        return res.status(201).json(notices.resetCodeSuccess(email))
    } else {
        return res.status(500).json(notices._500)
    }
}); 

module.exports = router