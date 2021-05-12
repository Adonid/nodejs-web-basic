const express = require('express')
const router = express.Router()
const {generalMiddleware} = require('../../../middleware')
const {DriverGoogle} = require('../../../services')
const {Category, Post} = require('../../../models')
const {notices} = require('../../../common')
const {Slug} = require('../../../helpers')
const config = require('../../../../config/config.json')

/**
 * LAY DANH SACH CAC BAI VIET KHI CUON LOAD
 * 
 * @param {offset=0, limit=8} = req.body
 * 
 * @return {obj} object JSON
 * 
 */
router.get('/', async (req, res) => {
    const {offset, limit} = req.body
    const posts = await Post.getPosts(offset, limit)
    if(posts){
        const data = notices.reqSuccess(posts)
        return res.status(data.code).json(data)
    }
    const err = notices._500
    return res.status(err.code).json(err)
})

/**
 * LAY CHI TIET BAI VIET DE DOC
 * 
 * @param {obj} = req.body
 * 
 * @return {obj} object JSON
 * 
 */
router.get('/detailed', async (req, res) => {
    const {id} = req.body
    const post = await Post.getDetailedPost({id})
    if(post){
        const data = notices.reqSuccess(post)
        return res.status(data.code).json(data)
    }
    const err = notices._500
    return res.status(err.code).json(err)
})

/**
 * TAO MOI 1 BAI VIET
 * 
 * @param {title, imageBase64, desc, readTime, content, categoryId}
 * @param {id, name, roleId}
 * 
 * @return {*} object JSON
 * 
 */
router.post('/create', generalMiddleware.checkNewPost, async (req, res) => {
    const {title, imageBase64, desc, readTime, content, categoryId} = req.body
    const {id} = req.user
    const err = notices._500
    // Upload anh bai viet
    const image = await DriverGoogle.uploadFile(config.googledriver.postFolder, imageBase64, title)
    // Check upload anh
    if(!image){
        return res.status(err.code).json(err)
    }
    // TAO BAI VIET - active khi nay mac dinh = false
    const newPost = await Post.createNewPost({title, image, desc, readTime, content, authorId: id, categoryId, active: false})
    if(newPost){
        const message = notices._200
        return res.status(message.code).json(message)
    }
    return res.status(err.code).json(err)
})

/**
 * TAO MOI 1 BAI VIET
 * 
 * @param {title, imageBase64, desc, readTime, content, categoryId}
 * @param {id, name, roleId}
 * 
 * @return {*} object JSON
 * 
 */
 router.post('/update', generalMiddleware.checkUpdatePost, async (req, res) => {
    const {id, title, imageBase64, desc, readTime, content, categoryId} = req.body
    const err = notices._500
    // Lay bai viet nay
    const post = await Post.getOnePost({id})
    if(!post){
        const notFound = notices.notFound('bài viết này')
        return res.status(notFound.code).json(notFound)
    }
    const fileId = post.image.fileId
    // Upload anh bai viet
    const image = await DriverGoogle.updateFile(config.googledriver.postFolder, imageBase64, title, fileId)
    // Check update anh
    if(!image){
        return res.status(err.code).json(err)
    }
    // CAP NHAT POST
    const updatePost = await Post.updatePost({title, image, desc, readTime, content, categoryId, active: true}, {id})
    if(updatePost){
        const message = notices._200
        return res.status(message.code).json(message)
    }
    return res.status(err.code).json(err)
})



module.exports = router