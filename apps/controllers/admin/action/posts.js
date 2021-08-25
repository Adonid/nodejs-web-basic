const express = require('express')
const router = express.Router()
const {generalMiddleware} = require('../../../middleware')
const {DriverGoogle} = require('../../../services')
const {Category, Post, ImagePost, Tag} = require('../../../models')
const {notices} = require('../../../common')
const {Slug} = require('../../../helpers')
const config = require('../../../../config/config.json')


/**
 * LAY DU LIEU KHOI TAO TRANG THEM MOI BAI VIET
 * 
 * @param {}
 * 
 * @return {obj} object JSON
 * 
 */
 router.get('/initially-data', async (req, res) => {
    try {
        const categories = await Category.getCategories()
        const tags = await Tag.getTags()
        const images = await ImagePost.getImages({type: [config.image.typePost, config.image.typeInPost]})
        const data = notices.reqSuccess({categories, images, tags})
        return res.status(data.code).json(data)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})

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
    const id = JSON.parse(req.query.params).id
    const post = await Post.getDetailedPost({id})
    if(post){
        const data = notices.reqSuccess(post)
        return res.status(data.code).json(data)
    }
    const err = notices._500
    return res.status(err.code).json(err)
})
/**
 * LAY CHI TIET BAI VIET DE SUA
 * 
 * @param {obj} = req.body
 * 
 * @return {obj} object JSON
 * 
 */
router.get('/get-edit', async (req, res) => {
    const id = JSON.parse(req.query.params).id
    try {
        // Lay chi tiet post
        const post = await Post.getEditPost({id})
        // Lay ca su lieu khoi tao trang
        const categories = await Category.getCategories()
        const tags = await Tag.getTags()
        const images = await ImagePost.getImages({type: [config.image.typePost, config.image.typeInPost]})
        const data = notices.reqSuccess({post, categories, images, tags})
        return res.status(data.code).json(data)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})

/**
 * TAO MOI 1 BAI VIET
 * 
 * @param {title, desc, imageId, categoryId, draft}
 * @param {id, name, roleId}
 * 
 * @return {*} object JSON
 * 
 */
router.post('/create', generalMiddleware.checkNewPost, async (req, res) => {
    const {title, desc, imageId, categoryId, draft} = req.body
    const {id} = req.user
    const data = {title, desc, imageId, categoryId, authorId: id, draft: draft||false}
    // TAO BAI VIET
    let postId = false
    postId = await Post.createNewPost(data)
    if(postId){
        const msg = draft?"Lưu nháp":"Tạo mới bài viết"
        const message = notices._201_data(msg, {postId})
        return res.status(message.code).json(message)
    }
    return res.status(notices._500.code).json(notices._500)
})
/**
 * TAO MOI NOI DUNG CHO BAI VIET
 * 
 * @param {postId, content}
 * 
 * @return {id}
 * 
 */
router.post('/create-content', async (req, res) => {
    const {postId, content} = req.body
    // TAO NOI DUNG
    let contentId = false
    contentId = await Post.createNewContent({postId, content})
    if(contentId){
        const message = notices._201_data("Tạo nội dung", {contentId})
        return res.status(message.code).json(message)
    }
    return res.status(notices._500.code).json(notices._500)
})
/**
 * CAP NHAT NOI DUNG CHO BAI VIET
 * 
 * @param {id, content}
 * 
 * @return {id}
 * 
 */
router.post('/update-content', async (req, res) => {
    const {contentId, content} = req.body
    // TAO NOI DUNG
    let contentPost = false
    contentPost = await Post.updateContent({content}, {id: contentId})
    if(contentPost){
        const message = notices._203("Nội dung bài viết", {contentPost})
        return res.status(message.code).json(message)
    }
    return res.status(notices._500.code).json(notices._500)
})

/**
 * XU LY TAGS & READTIME CHO POST
 * 
 * @param {id, tagsId} - tagsId = array
 * 
 * @return {msg} object JSON
 * 
 */
 router.post('/update-tags-readtime', async (req, res) => {
    const {id, tagsId, readTime} = req.body
    // CAP NHAT BAI VIET
    try {
        if(tagsId.length)
            await Post.addTags(tagsId, {id})
        await Post.updatePost({readTime}, {id})
        const message = notices._201_data("Cập nhật")
        return res.status(message.code).json(message)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})

/**
 * TCAP NHAT BAI VIET
 * 
 * @param {id, title, desc, imageId, categoryId, draft}
 * 
 * @return {*} object JSON
 * 
 */
router.post('/update', generalMiddleware.checkUpdatePost, async (req, res) => {
    const {id, title, desc, imageId, categoryId} = req.body
    // CAP NHAT BAI VIET
    try {
        const post = await Post.updatePost({title, desc, imageId, categoryId}, {id})
        const message = notices._203("Bài viết", {post})
        return res.status(message.code).json(message)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})

/**
 * KICH HOAT | NGUNG KICH HOAT BAI VIET
 * 
 * @param {id, values} = req.body
 * 
 * values = {}
 * 
 * @return {*} object JSON
 * 
 */
router.post('/active', async (req, res) => {
    const {id, active} = req.body
    try {
        await Post.updatePost({active}, {id})
        const message = notices._201(active?"Duyệt bài":"Dừng bài viết")
        return res.status(message.code).json(message)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)  
    }
})




module.exports = router