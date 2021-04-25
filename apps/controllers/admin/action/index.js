const express = require('express')
const router = express.Router()
const dashboard = require('./dashboard')
const myself = require('./mySelf')
const users = require('./users')
const editors = require('./editors')
const userDetail = require('./userDetail')
const manager = require('./manager')

/**
 *  Route cho phep vao lay ra du lieu cho trang dashboard
 */
 router.use('/', dashboard)

/**
 *  Route GET- danh sach cac editors
 */
 router.use('/editors-list', editors)
/**
 *  Cac thao tac tai khoan cua chinh toi
 */
 router.use('/myself', myself)
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
 router.use('/manager', manager)


module.exports = router