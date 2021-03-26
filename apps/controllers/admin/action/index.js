const express = require('express')
const router = express.Router()
const passport = require('passport')
const dashboard = require('./dashboard')
const users = require('./users')

/**
 * Yeu cau nay buoc user phai dang nhap thanh cong truoc khi vao lam viec
 */

router.use(passport.authenticate('jwt', { session: false }))

/**
 *  Route cho phep vao lay ra du lieu cho trang dashboard
 */
 router.use('/', dashboard)

/**
 *  Route - danh sach cac users
 */
 router.use('/user-list', users)


module.exports = router