const express = require('express')
const router = express.Router()
const admin = require("./admin")
const editor = require("./author")
const blog = require("./blog")

// Admin
router.use('/admin', admin)

// Editor
router.use('/editor', editor)

// User
router.use('/blog', blog)


module.exports = router