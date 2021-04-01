const express = require('express')
const router = express.Router()
const passport = require('passport')
const {checkLimit} = require('../../common')
const auth = require("./authentication")
const action = require("./action")
const home = require("./default")

/**
 *  Route nay dung xac thuc nguoi dung - login, register, forgot password...
 * 
 *  Chu y: Ung dung nay chi cho dang nhap bang mang xa hoi nhu - facebook, google, twitter, linkedin thong qua OAuth
 */
router.use('/auth', checkLimit(3, 7), auth)
/**
 *  Route nay dung cho user muon thao tac - thong tin ca nhan, comment, like post...
 * 
 *  Chong request qua nhieu
 * 
 *  Yeu cau nay buoc user phai dang nhap thanh cong truoc khi vao lam viec
 */
 router.use('/', checkLimit(3, 25), passport.authenticate('jwt', { session: false}), action)

/**
 *  Route nay dung cho tat ca nguoi dung muon vao website xem thong tin
 * 
 *  Chong request qua nhieu
 * 
 *  Yeu cau nay khong can user phai xac minh danh tinh
 */
 router.use('/home', checkLimit(3, 35), home)


module.exports = router