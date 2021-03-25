const express = require('express');
const router = express.Router();
const {checkLimit} = require('../../common')
const auth = require("./authentication");
const action = require("./action");

/**
 *  Route nay dung cho nguoi muon dang ky lam admin cua trang web
 */
router.use('/auth', checkLimit(7, 3), auth)

/**
 *  Route nay dung cho admin dang dang ky, dang nhap muon vao lam viec
 */
 router.use('/dashboard', checkLimit(15, 2), action)


module.exports = router