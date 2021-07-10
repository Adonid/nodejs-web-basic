const express = require('express')
const router = express.Router()
const dashboard = require('./dashboard')
const myself = require('./mySelf')
const users = require('./users')
const editors = require('./editors')
const userDetail = require('./userDetail')
const manager = require('./manager')
const categories = require('./categories')
const posts = require('./posts')
const address = require('./address')

/**
 *  Route cho phep vao lay ra du lieu cho trang dashboard
 */
 router.use('/', dashboard)

/**
 *  Danh sach cac editors
 */
 router.use('/editors-list', editors)
/**
 *  Cac thao tac tai khoan cua chinh toi
 */
 router.use('/myself', myself)
/**
 *  Cac thao tac danh sach cac users
 */
 router.use('/users-list', users)
/**
 *  Cac thao tac chi tiet user
 */
 router.use('/user-detail', userDetail)
/**
 *  Cac thao tac quan ly user
 */
 router.use('/manager', manager)
/**
 *  Cac thao tac quan ly danh muc
 */
 router.use('/categories', categories)
/**
 *  Cac thao tac quan ly bai viet
 */
 router.use('/posts', posts)


module.exports = router