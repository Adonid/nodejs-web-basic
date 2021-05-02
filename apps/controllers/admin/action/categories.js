const express = require('express')
const router = express.Router()
const {User} = require('../../../models')
const {notices} = require('../../../common')


/**
 * Lay danh sach tat ca danh muc
 * 
 * @param {*} 
 * 
 * @return {*} object JSON
 * 
 */
router.get('/', async (req, res) => {
    
})

/**
 * Tao moi 1 danh muc
 * 
 * @param {name, imageBase64, color} 
 * 
 * @return {*} object JSON
 * 
 */
router.post('/create', async (req, res) => {
    const {name, imageBase64, color} = req.body
    
    const err = notices._500
    return res.status(err.code).json(err)
})



module.exports = router