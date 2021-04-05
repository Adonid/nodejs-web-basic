const express = require('express');
const router = express.Router();


/**
 * Lay ra danh sach nguoi dung cua trang web. Phan ra cac dang nguoi dung la author hay user
 * 
 * @params {*} 
 * 
 * @returns {*} object JSON
 * 
 */
router.get('/', (req, res) => {
    res.json({
        msg: "Du lieu cho trang danh sach cac nguoi dung",
    });
});

module.exports = router;