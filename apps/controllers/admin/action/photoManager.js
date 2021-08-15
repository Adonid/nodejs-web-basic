const express = require('express')
const router = express.Router()
const {ImagePost} = require('../../../models')
const {ImageMannager} = require('../../../services')
const {notices} = require('../../../common')
const { Slug, Random } = require('../../../helpers')
const config = require('../../../../config/config.json')


/**
 * LAY CAC ANH THEO YEU CAU TRUY VAN
 * 
 * @params {query} 
 * 
 * @returns {*} object JSON
 * 
 */
 router.get('/', async (req, res) => {
    const {index, offset, limit} = req.body
    try {
        const images = await ImagePost.queryImages(index, offset, limit)
        const data = notices.reqSuccess(images)
        if(images)
            return res.status(data.code).json(data)
        return res.status(notices._500.code).json(notices._500)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})

/**
 * TRUY VAN ANH THEO THAM SO QUERYs
 * 
 * @params {index, offset, limit} 
 * 
 * @returns {*} object JSON
 * 
 */
 router.post('/query', async (req, res) => {
    const {index, offset, limit} = req.body
    try {
        const images = await ImagePost.queryImages(index, offset, limit)
        const data = notices.reqSuccess(images)
        if(images)
            return res.status(data.code).json(data)
        return res.status(notices._500.code).json(notices._500)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})

/**
 * CAP NHAT 1 ANH BAT KY
 * 
 * @params {id, type, content}
 * 
 * @returns {*} object JSON
 * 
 */
 router.post('/add-photo', async (req, res) => {
    const {nameFile, type, imageBase64} = req.body
    const {id} = req.user
    const fileName = Slug.slugNameImage(nameFile+"-"+Random.makeCodeReset(3))
    let values
    let folderOriginal
    // Lay uri vi tri luu anh
    switch (type) {
        case config.image.typePost:
            folderOriginal = config.image.postPreviewOriginal
            values = {original: folderOriginal+fileName, thumbnail: config.image.postPreviewThumbnail+fileName, name: fileName}
            break
    
        case config.image.typeInPost:
            folderOriginal = config.image.postInOriginal
            values = {original: folderOriginal+fileName, name: fileName}
            break
    
        case config.image.typeCategory:
            folderOriginal = config.image.categoryOriginal
            values = {original: folderOriginal+fileName, name: fileName}
            break
    
        case config.image.typeSystem:
            folderOriginal = config.image.fragmentOriginal
            values = {original: folderOriginal+fileName, name: fileName}
            break
    
        default:
            break
    }
    
    try {
        // Tai len anh goc truoc
        await ImageMannager.saveOriginal(folderOriginal, fileName, imageBase64)
        // Luu anh thumbnail neu la anh preview
        if(type===config.image.typePost){
            await ImageMannager.saveThumbnail(config.image.postPreviewThumbnail, fileName, folderOriginal+fileName)
        }
        // Them moi doi tuong anh vao DB
        const idImage = await ImagePost.createImage({...values, type, userId: id})
        // Tra ve anh da them vao
        const image = await ImagePost.getImage({id: idImage, type})
        const message = notices._201_data("Thêm ảnh", image)
        return res.status(message.code).json(message)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})

/**
 * CAP NHAT 1 ANH BAT KY
 * 
 * @params {id, type, content}
 * 
 * @returns {*} object JSON
 * 
 */
 router.post('/update-photo', async (req, res) => {
    const {id, nameFile, type, imageBase64} = req.body
    const fileName = Slug.slugNameImage(nameFile+"-"+Random.makeCodeReset(3))
    let values
    let folderOriginal
    // Lay uri vi tri luu anh
    switch (type) {
        case config.image.typePost:
            folderOriginal = config.image.postPreviewOriginal
            values = {original: folderOriginal+fileName, thumbnail: config.image.postPreviewThumbnail+fileName, name: fileName}
            break
    
        case config.image.typeInPost:
            folderOriginal = config.image.postInOriginal
            values = {original: folderOriginal+fileName, name: fileName}
            break
    
        case config.image.typeCategory:
            folderOriginal = config.image.categoryOriginal
            values = {original: folderOriginal+fileName, name: fileName}
            break
    
        case config.image.typeSystem:
            folderOriginal = config.image.fragmentOriginal
            values = {original: folderOriginal+fileName, name: fileName}
            break
    
        default:
            break
    }
    
    try {
        // Tai len anh goc truoc
        await ImageMannager.saveOriginal(folderOriginal, fileName, imageBase64)
        // Luu anh thumbnail neu la anh preview
        if(type===config.image.typePost){
            await ImageMannager.saveThumbnail(config.image.postPreviewThumbnail, fileName, folderOriginal+fileName)
        }
        // Lay doi tuong anh da luu
        const {original, thumbnail} = await ImagePost.getImage({id, type})
        // Xoa file da ton tai
        await ImageMannager.removeFileIfExists(original)
        await ImageMannager.removeFileIfExists(thumbnail)
        // Cap nhat vao DB
        await ImagePost.updateImage(values, {id, type})
       // Tra ve nhung gi da cap nhat
       const resuft = {...values, id, type}
       const message = notices._203("Ảnh", resuft)
       return res.status(message.code).json(message)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})


module.exports = router