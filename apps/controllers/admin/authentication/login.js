const express = require('express');
const router = express.Router();

const {
    adminMiddleware
} = require("../../../middleware")

/**
 * Router dung cho test cac admin
 * 
 * @params in BODY: { email, password}
 * 
 * @return json
 * 
 */
router.post('/', adminMiddleware.login, (req, res) => {
    // Du lieu da OK - thuc thi logic cho du lieu ly tuong phia MODEL
    res.json({message: "Xu ly DANG NHAP cho admin"});
});

module.exports = router;