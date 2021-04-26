const express = require('express')
const router = express.Router()


/**
 * Ly du lieu cho trang dashboard ADMIN
 * 
 */
router.post('/', (req, res) => {
    return res.status(201).json({msg: "Thuc hien cap nhat thong tin"})
})

module.exports = router