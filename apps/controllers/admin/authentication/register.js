const express = require('express');
const router = express.Router();
const {
    adminMiddleware
} = require("../../../middleware")
const {bcrypt} = require('../../../common')

/**
 *  TAO TAI KHOAN ADMIN or EDITOR
 * 
 * @params {name, email, password}
 * 
 * @returns msg
 */
router.post('/', adminMiddleware.register, (req, res) => {
    const {name, email, password} = req.body
    const hash = bcrypt.hashPassword(password)
    res.json({message: "Xu ly DANG KY cho admin", hash: hash});
});

module.exports = router;