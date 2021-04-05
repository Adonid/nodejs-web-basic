const express = require('express')
const router = express.Router()


/**
 * Lay ra danh sach nguoi dung cua trang web
 * 
 * @params {*} 
 * 
 * @returns {*} object JSON
 * 
 */
router.get('/', (req, res) => {
    const {offset, limit} = req.body
    res.json({
        msg: "Du lieu cho trang danh sach cac nguoi dung " + offset + " - " + limit,
    })
})

module.exports = router