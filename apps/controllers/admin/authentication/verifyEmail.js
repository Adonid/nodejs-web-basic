const express = require('express')
const router = express.Router()
const {
    adminMiddleware
} = require("../../../middleware")
/**
 * XAC MINH TAI KHOAN  & GUI EMAIL CHUA LINK DOI MAT KHAU
 * 
 * @params email
 * 
 * @returns 
 */
router.post('/', adminMiddleware.verifyEmail, (req, res) => {

    res.json({message: "Gui link reset password vao email cho admin"});
});

module.exports = router