const express = require('express')
const router = express.Router()
const register = require("./register")
const facebook = require("./facebook")
const google = require("./google")
// const twitter = require("./twitter")


// /**
//  * Gioi han so lan request dang ky
//  */
router.use('/register', register)

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