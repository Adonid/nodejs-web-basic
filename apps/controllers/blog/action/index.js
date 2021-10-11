const express = require('express')
const router = express.Router()
const myself = require('./mySelf')

/** THONG TIN CA NHAN CUA USER */
 router.use('/my-self', myself)


module.exports = router