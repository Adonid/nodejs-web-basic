const express = require('express')
const router = express.Router()
const dashboard = require('./dashboard')
const myself = require('./mySelf')
const posts = require('./posts')

/**
 *  Route cho phep vao lay ra du lieu cho trang dashboard
 */
 router.use('/', dashboard)

/**
 *  Route - Thong tin ca nhan
 */
 router.use('/myself', myself)
/**
 *  Route - Thong tin ca nhan
 */
 router.use('/posts', posts)


module.exports = router