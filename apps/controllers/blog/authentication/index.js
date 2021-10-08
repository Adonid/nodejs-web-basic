const express = require('express')
const router = express.Router()
const register = require("./register")
const verifyEmail = require("./verifyEmail")
const resetPassword = require("./updatePassword")
const facebook = require("./facebook")
const google = require("./google")
// const twitter = require("./twitter")


/**
 * Gioi han so lan request dang ky
 */
router.use('/register', register)

/**
 * Xac thuc email doi mat khau
 */
 router.use('/verify-email', verifyEmail)

/**
 * Xac thuc email doi mat khau
 */
 router.use('/reset-password', resetPassword)

/**
 *  Route nay dung cho user dang nhap | dang ky bang FACBOOK
 */
 router.use('/facebook', facebook)

/**
 *  Route nay dung cho user dang nhap | dang ky bang GOOGLE
 */
 router.use('/google', google)

/**
 *  Route nay dung cho user dang nhap | dang ky bang TWITTER
 */
//  router.use('/twitter', twitter)


module.exports = router