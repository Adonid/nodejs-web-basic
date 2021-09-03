const express = require('express')
const router = express.Router()
const {User, Post, ImagePost} = require('../../../models')
const {notices} = require('../../../common')


/**
 * LAY CHI TIET CAC DU LIEU CUA 1 EDITOR
 * 
 * @params {} 
 * 
 * @returns {*} object JSON
 * 
 */
router.get('/', async (req, res) => {
    const id = JSON.parse(req.query.params).id
    try {
        const user = await User.getUser({id, roleId: 2})
                              .then(user => user)
                              .catch(err => err)
        const posts = await Post.getPostsAuthor({authorId: id})
        const postsdraft = await Post.getPostsDraftAuthor({authorId: id})
        const amountPost = await Post.countPosts({authorId: id})
        const amountImage = await ImagePost.countImages({userId: id})
        const images = await ImagePost.getImages({userId: id})
        const data = notices.reqSuccess({user, posts, postsdraft, amountPost, amountImage, images})
        return res.status(data.code).json(data)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})
/**
 * CUON LOAD LAY CAC BAI VIET CUA TAC GIA
 * 
 * @params {*}
 * 
 * @returns {*} object JSON
 * 
 */
router.post('/load-post', async (req, res) => {
    const {index, offset, limit} = req.body
    try {
        const posts = await Post.getPostsAuthor({index: {...index, roleId: 2}, offset, limit})
        const data = notices.reqSuccess(posts||[])
        return res.status(data.code).json(data)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})

module.exports = router