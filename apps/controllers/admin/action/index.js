const express = require('express')
const router = express.Router()
const dashboard = require('./dashboard')
const users = require('./users')
const editors = require('./editors')
const userDetail = require('./userDetail')
const updateUserInfo = require('./updateUserInfo')

/**
 *  Route cho phep vao lay ra du lieu cho trang dashboard
 */
 router.use('/', dashboard)

/**
 *  Route GET- danh sach cac editors
 */
 router.use('/editors-list', editors)
/**
 *  Route GET- danh sach cac users
 */
 router.use('/users-list', users)
/**
 *  Route GET- chi tiet user
 */
 router.use('/user-detail', userDetail)
/**
 *  Route POST- cap nhat thong tin user
 */
 router.use('/update', updateUserInfo)


module.exports = router