const {CommentsPost, Post} = require('../../models')
const { Op } = require("sequelize");

/** TAO MOI 1 COMMENT CHO ADMIN
 * 
 * @param {postId, userId, comment} = payload
 * 
 * @return {*}
*/
const addNewComment = async payload => {
    const commentId = await CommentsPost.create(payload)
    .then(comment => {
        // console.log(comment)
        return comment ? comment.dataValues.id : false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return commentId
}


module.exports={
    addNewComment,
}