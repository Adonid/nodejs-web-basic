const express = require('express')
const router = express.Router()
const dashboard = require('./dashboard')
const myself = require('./mySelf')

/**
 *  Route cho phep vao lay ra du lieu cho trang dashboard
 */
 router.use('/', dashboard)

/**
 *  Route - Thong tin ca nhan
 */
 router.use('/myself', myself)


module.exports = router