const express = require('express')
const router = express.Router()
const {ImageMannager} = require('../../../services')
const {Colors, Category, Post, Tag, ImagePost} = require('../../../models')
const {notices} = require('../../../common')
const {Slug, Random} = require('../../../helpers')
const config = require('../../../../config/config.json')
const {
    generalMiddleware,
    adminMiddleware
} = require("../../../middleware")

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
        const images = await ImagePost.getImages({type: "category"})
        const categories = await Category.getCategories()
        const tags = await Tag.getTags()
        const colors = await Colors.getColors()
        const data = notices.reqSuccess({images, categories, tags, colors})
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
router.post('/category', adminMiddleware.checkCategory, async (req, res) => {
    const {id, name, colorId, imageId} = req.body
    try {
        // CO ID->UPDATE
        if(id){
            await Category.updateCategory({name, colorId, imageId}, {id})
        }
        // KO CO ID->ADD NEW
        else{
            await Category.createCategory({name, colorId, imageId})
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
router.post('/category/del', adminMiddleware.checkDelCategory, async (req, res) => {
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

/**
 * CREATE | UPDATE TAG
 * 
 * @param {id, name, color} 
 * 
 * @return {*} object JSON
 * 
 */
 router.post('/tag', async (req, res) => {
    const {id, name, colorId} = req.body
    try {
        // CO ID->UPDATE
        if(id){
            await Tag.updateTag({name, colorId}, {id})
        }
        // KO CO ID->ADD NEW
        else{
            await Tag.createTag({name, colorId})
        }
        // Lay lai danh sach tags
        const tags = await Tag.getTags()
        const notify = id?notices._203("Thẻ tag", tags):notices._201_data("Tạo thẻ tag", tags)
        return res.status(notify.code).json(notify)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})

/**
 * DELETE TAG - EXCEPTION
 * 
 * @param {id} 
 * 
 * @return {*} object JSON
 * 
 */
 router.post('/tag/del', async (req, res) => {
    const {id} = req.body
    try {
        // Xoa the tag
        await Tag.deleteTag(id)
        // Lay lai danh sach the tag
        const tags = await Tag.getTags()
        const resuft = notices._204(tags)
        return res.status(resuft.code).json(resuft)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})

/** 
 * POST - Upload anh CATEGORY
 * 
 * @param {email, roleId, name} in user. Rassport returned. { imageBase64 }
 * @param {imageBase64} in body
 * 
 */
 router.post('/upload-category-image', generalMiddleware.checkUpdateImage, async (req, res) => {
    const {id, imageBase64} = req.body
    const user = req.user
    const indexImage = {userId: user.id, type: config.image.typeCategory}
    const folderOriginal = config.image.categoryOriginal
    const fileName = Slug.slugNameImage(user.name+"-"+Random.makeCodeReset(5))
    const values = {original: folderOriginal+fileName, name: fileName}
    const newImage = {...values, ...indexImage }
    try {
        // Tai len anh goc category
        await ImageMannager.saveOriginal(folderOriginal, fileName, imageBase64)
        if(id){
            // CAP NHAT
            // Lay anh category da luu
            const {original} = await ImagePost.getImage({...indexImage, id})
            // Xoa file da ton tai
            if(original)
                ImageMannager.removeFileIfExists(original)
            // Cap nhat vao DB
            await ImagePost.updateImage(values, indexImage)
        }
        else{
            // TAO MOI
            // Them moi vao DB
            await ImagePost.createImage(newImage)
        }
       // Lay lai danh sach cac anh danh muc
       const categories = await ImagePost.getImages(indexImage)

       const message = notices._203("Upload ảnh category", categories)
       return res.status(message.code).json(message)
    } catch (error) {
        console.log(error)
        return res.status(notices._500.code).json(notices._500)
    }
})



module.exports = router