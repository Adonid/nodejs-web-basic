const express = require('express')
const router = express.Router()
const {notices} = require('../../../common')
const {JwtStrategy} = require('../../../services')

const {
    editorMiddleware
} = require("../../../middleware")

/**
 * Router dung cho test cac editor
 * 
 * @param  { email, password} in BODY:
 * 
 * @return json
 * 
 */
router.post('/', editorMiddleware.verifyLoginEditor, async (req, res) => {
    const {email} = req.body
    // Tra ve MA JWT cho editor
    const token = await JwtStrategy.generateToken(email)
    const info = notices.loginSuccess(token)
    return res.status(info.code).json(info)
});

module.exports = router