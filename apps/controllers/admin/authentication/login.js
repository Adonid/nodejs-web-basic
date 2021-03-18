const express = require('express');
const router = express.Router();

const {admin} = require("../../../validation")

//Router dung cho test cac admin
router.post('/', admin.loginValidation, (req, res) => {
    // Du lieu da DUNG FORMAT - thuc thi logic
    res.json({message: "Xu ly DANG NHAP cho admin"});
});

module.exports = router;