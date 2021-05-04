const express = require('express')
const router = express.Router()
const {adminMiddleware} = require('../../../middleware')
const {DriverGoogle} = require('../../../services')
const {Category} = require('../../../models')
const {notices} = require('../../../common')
const {Slug} = require('../../../helpers')
const config = require('../../../../config/config.json')

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
        const data = notices.reqSuccess(categories)
        return res.status(data.code).json(data)
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
    const dataFile = await DriverGoogle.uploadFile(config.googledriver.categoryFolder, imageBase64, name)
    // TEST UPLOAD FILE
    if(!dataFile){
        return res.status(err.code).json(err)
    }
    // CAP NHAT FILE CHO USER NAY
    const newCategory = await Category.createCategory(name, dataFile, color, description)
    if(newCategory){
        const message = notices._200
        return res.status(message.code).json(message)
    }
    return res.status(err.code).json(err)
})



module.exports = router