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
        const message = notices._201_data("Bình luận", comments)
        return res.status(message.code).json(message)
    } catch (error) {
        console.log(error)
        return res.status(notices._500.code).json(notices._500)  
    }
})
/**
 * THEM 1 COMMENT VAO POST
 * 
 * @param {postId, comment} = req.body
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
            const message = notices._201_data("Bình luận", comments)
            return res.status(message.code).json(message)
        }
        return res.status(notices._500.code).json(notices._500)  
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)  
    }
})
/**
 * XOA 1 COMMENT TRONG POST
 * 
 * @param {id} = req.body
 *
 * @return {*} object JSON
 * 
 */
router.post('/remove-comment', async (req, res) => {
    const {postId, commentId} = req.body
    try {
        await Comments.removeComment({id: commentId})
        const comments = await Comments.getCommentsPost({postId})
        const message = notices._201_data("Xóa bình luận", comments)
        return res.status(message.code).json(message)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)  
    }
})

/**
 * LIKE COMMENT
 * 
 * @param {postId, commentId} = req.body
 *
 * @return {*} object JSON
 * 
 */
router.post('/like-comment', async (req, res) => {
    const {postId, commentId} = req.body
    const {id} = req.user
    try {
        // Lay comment nay xem
        const like = await Comments.getOneLikeComment({commentId, userId: id})
        // Neu comment ton tai -> dao trang thai like
        if(like){
            const level = like.level?0:1
            await Comments.updateLikeComment({level}, {commentId, userId: id})
        }
        // Neu chua like thi them moi (Mac dinh la like)
        else{
            await Comments.likeComment({commentId, userId: id})
        }
        const comments = await Comments.getCommentsPost({postId})
        const message = notices._201_data("Like bình luận!", comments)
        return res.status(message.code).json(message)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)  
    }
})


/**
 * THEM 1 REPLY VAO COMMENT
 * 
 * @param {postId, commentId, reply} = req.body
 *
 * @return {*} object JSON
 * 
 */
 router.post('/add-reply', async (req, res) => {
    const {postId, commentId, reply} = req.body
    const {id} = req.user
    try {
        const replyId = await Comments.addNewReply({userId: id, commentId, reply})
        if(replyId){
            const comments = await Comments.getCommentsPost({postId})
            const message = notices._201_data("Phản hồi!", comments)
            return res.status(message.code).json(message)
        }
        return res.status(notices._500.code).json(notices._500)  
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)  
    }
})
/**
 * XOA 1 REPLY
 * 
 * @param {id} = req.body
 *
 * @return {*} object JSON
 * 
 */
 router.post('/remove-reply', async (req, res) => {
    const {postId, replyCommentId} = req.body
    try {
        await Comments.removeReply({id: replyCommentId})
        const comments = await Comments.getCommentsPost({postId})
        const message = notices._201_data("Xóa phản hồi", comments)
        return res.status(message.code).json(message)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)  
    }
})

/**
 * LIKE REPLY
 * 
 * @param {postId, replyCommentId} = req.body
 *
 * @return {*} object JSON
 * 
 */
 router.post('/like-reply', async (req, res) => {
    const {postId, replyCommentId} = req.body
    const {id} = req.user
    try {
        // Lay reply nay xem
        const like = await Comments.getOneLikeReply({replyCommentId, userId: id})
        // Neu reply ton tai -> dao trang thai like
        if(like){
            const level = like.level?0:1
            await Comments.updateLikeReply({level}, {replyCommentId, userId: id})
        }
        // Neu chua like thi them moi (Mac dinh la like)
        else{
            await Comments.likeReply({replyCommentId, userId: id})
        }
        const comments = await Comments.getCommentsPost({postId})
        const message = notices._201_data("Like phản hồi", comments)
        return res.status(message.code).json(message)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)  
    }
})

/**
 * DOI TRANG THAI COMMENT DA DOC | CHUA DOC
 * 
 * @params {id}
 * 
 * @return {*}
 */
 router.post('/marker', async (req, res) => {
    const {id} = req.body
    try {
        // LAY TRANG THAI COMMENT
        const comment = await Comments.getComment({id})
        // CAP NHAT LAI TRANG THAI DA DOC
        await Comments.updateComment({marker: !comment.marker}, {id})

        const message = notices._201_data("Doi trang thai thanh cong", {comment})
        return res.status(message.code).json(message)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})

module.exports = router