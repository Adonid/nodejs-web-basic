const express = require('express')
const router = express.Router()
const admin = require("./admin")

// admin
router.use('/admin', admin)


module.exports = router