const express = require('express')
const router = express.Router()
const {adminMiddleware} = require('../../../middleware')
const {Category} = require('../../../models')
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
    const categories = await Category.getCategories()
    if(categories){
        const info = notices.reqSuccess(categories)
        return res.status(info.code).json(info)
    }
    const err = notices._500
    return res.status(err.code).json(err)
})

/**
 * Tao moi 1 danh muc
 * 
 * @param {name, imageBase64, color, description} 
 * 
 * @return {*} object JSON
 * 
 */
router.post('/create', adminMiddleware.checkNewCategory, async (req, res) => {
    const {name, imageBase64, color, description} = req.body
    
    const err = notices._500
    return res.status(err.code).json(err)
})



module.exports = router