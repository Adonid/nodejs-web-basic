const express = require('express')
const router = express.Router()
const {Comments} = require('../../../models')
const {notices} = require('../../../common')


/**
 * LAY DANH DACH COMMENTS CUA 1 POST
 * 
 * @param {postId} = req.body
 *
 * @return {*} object JSON
 * 
 */
router.post('/get-comments', async (req, res) => {
    const {postId} = req.body
    try {
        const comments = await Comments.getCommentsPost({postId})
        const message = notices._201_data("Bình luận thành công!", comments)
        return res.status(message.code).json(message)
    } catch (error) {
        console.log(error)
        return res.status(notices._500.code).json(notices._500)  
    }
})
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
        if(commentId){
            const comments = await Comments.getCommentsPost({postId})
            const message = notices._201_data("Bình luận thành công!", comments)
            return res.status(message.code).json(message)
        }
        return res.status(notices._500.code).json(notices._500)  
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)  
    }
})


module.exports = router