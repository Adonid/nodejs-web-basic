const express = require('express')
const router = express.Router()
const facebook = require("./facebook")

/**
 *  Route nay dung cho admin dang nhap
 */
 router.use('/facebook', facebook)




module.exports = router