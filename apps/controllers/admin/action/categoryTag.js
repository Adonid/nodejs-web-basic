const express = require('express')
const router = express.Router()
const {adminMiddleware} = require('../../../middleware')
const {DriverGoogle, ImageMannager} = require('../../../services')
const {Category, ImagePost} = require('../../../models')
const {notices} = require('../../../common')
const {Slug, Random} = require('../../../helpers')
const config = require('../../../../config/config.json')
const {
    generalMiddleware
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
    const images = await ImagePost.getImages({type: "category"})
    // const categories = await Category.getCategories()
    if(images){
        const data = notices.reqSuccess(images)
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

/**
 * Tao moi 1 danh muc
 * 
 * @param {name, imageBase64, color, description} 
 * 
 * @return {*} object JSON
 * 
 */
router.post('/update', adminMiddleware.checkUpdateCategory, async (req, res) => {
    const {id, name, imageBase64, color, description} = req.body
    const err = notices._500
    // Lay danh muc nay
    const category = await Category.getCategory({id})
    const fileId = category.image.fileId
    // Upload anh len neu ton tai
    const image = await DriverGoogle.updateFile(config.googledriver.categoryFolder, imageBase64, name, fileId)
    // TEST UPDATE FILE
    if(!image){
        return res.status(err.code).send(err)
    }
    // CAP NHAT DANH MUC VAO DB
    const dataUpdate = await Category.updateCategory({name, image, color, description}, {id})
    if(dataUpdate){
        const info = notices.reqSuccess(dataUpdate)
        return res.status(info.code).send(info)
    }
    return res.status(err.code).send(err)
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
    const values = {original: folderOriginal+fileName, name: user.name}
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