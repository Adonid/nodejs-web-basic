const express = require('express')
const router = express.Router()
const {Comments} = require('../../../models')
const {notices} = require('../../../common')


/**
 * THEM 1 COMMENT VAO POST
 * 
 * @param {postId, userId, comment} = req.body
 *
 * @return {*} object JSON
 * 
 */
router.post('/add-comment', async (req, res) => {
    const {postId, comment} = req.body
    const {id} = req.user
    try {
        const commentId = await Comments.addNewComment({userId: id, postId, comment})
        const message = notices._201_data("Bình luận thành công!", {commentId})
        return res.status(message.code).json(message)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)  
    }
})




module.exports = router