const express = require('express')
const router = express.Router()
const facebook = require("./facebook")
const google = require("./google")


/**
 * Gioi han so lan request cho cac route dang nhap, dang ky ben trong
 */
router.use(checkLimit(3, 7))

/**
 *  Route nay dung cho user dang nhap | dang ky bang FACBOOK
 */
 router.use('/facebook', facebook)

/**
 *  Route nay dung cho user dang nhap | dang ky bang GOOGLE
 */
 router.use('/google', google)


module.exports = router