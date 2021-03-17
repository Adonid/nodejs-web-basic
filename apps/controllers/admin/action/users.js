const express = require('express');
const router = express.Router();


/**
 * Ly du lieu cho trang dashboard ADMIN
 * 
 */
router.get('/', (req, res) => {
    res.json({
        error: "Du lieu cho trang danh sach cac nguoi dung",
    });
});

module.exports = router;