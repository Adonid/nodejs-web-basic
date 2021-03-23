const express = require('express');
const router = express.Router();
const timeout = require('connect-timeout')
const auth = require("./authentication");
const action = require("./action");

/**
 *  Route nay dung cho nguoi muon dang ky lam admin cua trang web
 */
router.use('/auth',  auth)

/**
 *  Route nay dung cho admin dang dang ky, dang nhap muon vao lam viec
 */
 router.use('/dashboard', action)


module.exports = router