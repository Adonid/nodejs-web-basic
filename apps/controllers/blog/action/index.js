const express = require('express')
const router = express.Router()
const myself = require('./mySelf')

/**
 *  Route nay dung cho user muon thao tac - thong tin ca nhan, comment, like post...
 * 
 *  Chong request qua nhieu
 * 
 *  Yeu cau nay buoc user phai dang nhap thanh cong truoc khi vao lam viec
 */
 router.use('/myself', myself)


module.exports = router