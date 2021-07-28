const express = require('express')
const router = express.Router()
const {CompanyDescription} = require('../../../models')
const {notices} = require('../../../common')
const {Slug, Random} = require('../../../helpers')
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
    try {
        const fox = await CompanyDescription.getCompanysDescription()
        const data = notices.reqSuccess(fox)
        return res.status(data.code).json(data)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }    
})

/**
 * CREATE | UPDATE CATEGORY
 * 
 * @param {id, name, color, description} 
 * 
 * @return {*} object JSON
 * 
 */
router.post('/manipulation', async (req, res) => {
    const {id, name, color, imageId} = req.body
    try {
        // CO ID->UPDATE
        if(id){
            await Category.updateCategory({name, color, imageId}, {id})
        }
        // KO CO ID->ADD NEW
        else{
            await Category.createCategory({name, color, imageId})
        }
        // Lay lai danh sach categories
        const categories = await Category.getCategories()
        const notify = id?notices._203("Danh mục", categories):notices._201_data("Tạo danh mục", categories)
        return res.status(notify.code).json(notify)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})

/**
 * DELETE CATEGORY - EXCEPTION ID = 1
 * 
 * @param {id} 
 * 
 * @return {*} object JSON
 * 
 */
router.post('/manipulation/del', async (req, res) => {
    const {id} = req.body
    try {
        // CHUYEN TAT CA BAI VIET TRONG DANH MUC NAY VE DANH MUC MAC DINH = 1
        await Post.updatePreviewPost({categoryId: 1}, {categoryId: id})
        // VI KHONG CON KHOA NGOAI CUA POST TRO TOI NEN CO THE XOA DUOC ROI
        await Category.deleteCategory(id)
        // Lay lai danh sach categories
        const categories = await Category.getCategories()
        const resuft = notices._204(categories)
        return res.status(resuft.code).json(resuft)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})


module.exports = router