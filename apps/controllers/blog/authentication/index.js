const express = require('express')
const router = express.Router()
const facebook = require("./facebook")


/**
 * Gioi han so lan request cho cac route dang nhap, dang ky ben trong
 */
router.use(checkLimit(3, 7))

/**
 *  Route nay dung cho admin dang nhap
 */
 router.use('/facebook', facebook)




module.exports = router