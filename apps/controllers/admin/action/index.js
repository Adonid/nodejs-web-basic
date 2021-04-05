const express = require('express')
const router = express.Router()
const dashboard = require('./dashboard')
const users = require('./users')
const editors = require('./editors')

/**
 *  Route cho phep vao lay ra du lieu cho trang dashboard
 */
 router.use('/', dashboard)

/**
 *  Route - danh sach cac editors
 */
 router.use('/editors-list', editors)
/**
 *  Route - danh sach cac users
 */
 router.use('/users-list', users)


module.exports = router