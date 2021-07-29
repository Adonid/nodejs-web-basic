const express = require('express')
const router = express.Router()
const dashboard = require('./dashboard')
const myself = require('./mySelf')
const users = require('./users')
const author = require('./author')
const user = require('./user')
const manager = require('./manager')
const categoryTag = require('./categoryTag')
const posts = require('./posts')
const companyDescription = require('./companyDescription')
const distributedData = require('./distributedData')

/**
 *  Route cho phep vao lay ra du lieu cho trang dashboard
 */
 router.use('/', dashboard)
 /**
 *  Cac thao tac tai khoan cua chinh toi
 */
  router.use('/myself', myself)
/**
 *  Cac thao tac danh sach cac user & author
 */
 router.use('/users-list', users)
/**
 *  Thao tac voi Author
 */
 router.use('/author', author)
/**
 *  Thao tac voi User
 */
 router.use('/user', user)
/**
 *  Cac thao tac quan ly user
 */
 router.use('/manager', manager)
/**
 *  Cac thao tac quan ly danh muc
 */
 router.use('/category-tag', categoryTag)
/**
 *  Cac thao tac quan ly bai viet
 */
 router.use('/posts', posts)
/**
 *  Cac thao tac voi mo ta cua trang
 */
 router.use('/company-description', companyDescription)
/**
 *  Cac thao tac voi du lieu phan tan cua ung dung
 */
 router.use('/distributed', distributedData)


module.exports = router