const express = require('express')
const router = express.Router()
const dashboard = require('./dashboard')
const users = require('./users')
const myself = require('./mySelf')

/**
 *  Route cho phep vao lay ra du lieu cho trang dashboard
 */
 router.use('/', dashboard)

/**
 *  Route - danh sach cac users
 */
 router.use('/user-list', users)

/**
 *  Route - Thong tin ca nhan
 */
 router.use('/myself', myself)


module.exports = router