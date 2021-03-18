const express = require('express')
const router = express.Router()
const register = require("./register")
const login = require("./login")
const resetPw = require("./resetPassword")

// const {checkLimit} = require("../../../common")


/**
 *  So lan request khong qua nhieu trong 1 thoi gian nhat dinh
 * 
 */
//  router.use(checkLimit(3,5))

/**
 *  Route nay dung cho admin dang nhap
 */
 router.use('/', login)

/**
 *  Route nay dung cho nguoi muon dang ky lam admin cua trang web
 * 
 *  Doi voi ADMIN chi cho dang ky bang tk EMAIL
 */
router.use('/register', register)

/**
 *  Route nay dung cho admin muon reset mat khau
 */
 router.use('/reset-password', resetPw)


module.exports = router