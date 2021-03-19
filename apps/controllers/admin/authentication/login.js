const express = require('express');
const router = express.Router();

const {
    login
} = require("../../../middleware")

//Router dung cho test cac admin
router.post('/', login.adminLogin, (req, res) => {
    // Du lieu da DUNG FORMAT - thuc thi logic cho du lieu ly tuong phia MODEL
    res.json({message: "Xu ly DANG NHAP cho admin"});
});

module.exports = router;