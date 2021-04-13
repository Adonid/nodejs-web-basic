const express = require('express')
const router = express.Router()
const {User} = require('../../../models')
const {notices} = require('../../../common')


/**
 * Lay thong tin chi tiet nguoi dung
 * 
 * @params {*} email, roleId
 * 
 * @returns {*} object JSON
 * 
 */
router.post('/', async (req, res) => {
    
})

module.exports = router