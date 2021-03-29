const express = require('express')
const router = express.Router()
const dashboard = require('./dashboard')
const users = require('./users')

/**
 *  Route cho phep vao lay ra du lieu cho trang dashboard
 */
 router.use('/', dashboard)

/**
 *  Route - danh sach cac users
 */
 router.use('/user-list', users)


module.exports = router