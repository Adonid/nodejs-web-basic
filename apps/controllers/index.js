const express = require('express')
const router = express.Router()
const admin = require("./admin")
const editor = require("./author")

// Admin
router.use('/admin', admin)

// Editor
router.use('/editor', editor)


module.exports = router