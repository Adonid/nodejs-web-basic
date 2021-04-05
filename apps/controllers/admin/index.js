const express = require('express')
const router = express.Router()
const passport = require('passport')
const {checkLimit} = require('../../common')
const auth = require("./authentication")
const action = require("./action")

/**
 *  Route nay dung cho nguoi muon dang ky lam admin cua trang web
 */
router.use('/auth', checkLimit(3, 7), auth)

/**
 *  Route nay dung cho admin dang dang ky, dang nhap muon vao lam viec
 * 
 *  Chong request qua nhieu
 * 
 *  Yeu cau nay buoc user phai dang nhap thanh cong truoc khi vao lam viec
 */
 router.use('/dashboard', checkLimit(3, 25), passport.authenticate('jwt', { session: false}), action)


module.exports = router