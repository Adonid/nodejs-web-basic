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
    const err = notices._500
    if(posts){
        const data = notices.reqSuccess(posts)
        return res.status(data.code).json(data)
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
    // TAO BAI VIET - active khi nay mac dinh = true
    const newPost = await Post.createNewPost({title, image, desc, readTime, content, authorId: id, categoryId, active: true})
    if(newPost){
        const message = notices._200
        return res.status(message.code).json(message)
    }
    return res.status(err.code).json(err)
})



module.exports = router