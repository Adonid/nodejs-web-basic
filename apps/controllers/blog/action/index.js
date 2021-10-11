const express = require('express')
const router = express.Router()
const myself = require('./mySelf')
const commentPost = require('./commentPost')

/** THONG TIN CA NHAN CUA USER */
 router.use('/my-self', myself)

/** COMMENT POST */
 router.use('/comment-post', commentPost)


module.exports = router