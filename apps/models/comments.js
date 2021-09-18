const {
    comments_post, 
    replys_comment, 
    favourites_comment, 
    favourites_reply_comment, 
    user, user_image
} = require('../../models')

/** LAY 1 COMMENT POST
 * 
 * @param {id}
 * 
 * @return {*}
*/
const getComment = async index => {
    const comment = await comments_post.findOne({
        attributes: ['id', 'marker'],
        where: index
    })
    .then(data => {
        // console.log(comment)
        return data ? data.dataValues : false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return comment
}

/** LAY DANH SACH TOAN BO COMMENTS CUA POST
 * 
 * @param {postId} = index
 * 
 * @return {*}
*/
const getCommentsPost = async index => {
    const comments = await comments_post.findAll({
        attributes: ['id', 'comment', 'updatedAt'],
        include: [
            {
                model: user,
                attributes: ['id', 'name', 'fullName'],
                include: [
                    {
                        model: user_image,
                        attributes: ['type', 'name', 'thumbnail']
                    }
                ]
            },
            {
                model: replys_comment,
                attributes: ['id', 'reply', 'updatedAt'],
                include: [
                    {
                        model: user,
                        attributes: ['name', 'fullName'],
                        include: [
                            {
                                model: user_image,
                                attributes: ['type', 'name', 'thumbnail']
                            }
                        ]
                    },
                    {
                        model: favourites_reply_comment,
                        attributes: ['userId', 'level'],
                        include: [
                            {
                                model: user,
                                attributes: ['name', 'fullName']
                            }
                        ]
                    }
                ]
            },
            {
                model: favourites_comment,
                attributes: ['userId', 'level'],
                include: [
                    {
                        model: user,
                        attributes: ['name', 'fullName']
                    }
                ]
            }
        ],
        where: index
    })
    .then(comment => {
        // console.log(comment)
        return comment||false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return comments
}

/** TAO MOI 1 COMMENT CHO ADMIN
 * 
 * @param {postId, userId, comment} = payload
 * 
 * @return {*}
*/
const addNewComment = async payload => {
    const commentId = await comments_post.create(payload)
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

/** XOA 1 COMMENT
 * 
 * @param {id} = index
 * 
 * @return {*}
*/
const removeComment = async index => {
    try {
        await comments_post.destroy({
            where: index
          })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

/** KIEM TRA SU TON TAI CUA 1 LIKE COMMENT
 * 
 * @param {commentId, userId} = payload
 * 
 * @return {*}
*/
const getOneLikeComment = async obj => {
    try {
        const data = await favourites_comment.findOne({
            attributes: ['id', 'commentId', 'userId', 'level'],
            where: obj
        })
        // console.log(data)
        return data ? data.dataValues : false
    } catch (error) {
        console.log(error)
        return false
    }
}

/** LIKE 1 COMMENT
 * 
 * @param {commentId, userId} = payload
 * 
 * @return {*}
*/
const likeComment = async payload => {
    try {
        await favourites_comment.create(payload)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
/** UPDATELIKE 1 COMMENT
 * 
 * @param {level} = value
 * @param {commentId, userId} = index
 * 
 * @return {*}
*/
const updateLikeComment = async (value, index) => {
    try {
        await favourites_comment.update(value, {
            where: index
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

/** REPLY COMMENT */

/** TAO MOI 1 REPLY CHO COMMENT
 * 
 * @param {userId, commentId, reply} = payload
 * 
 * @return {*}
*/
const addNewReply = async payload => {
    const commentId = await replys_comment.create(payload)
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

/** XOA 1 REPLY
 * 
 * @param {id} = index
 * 
 * @return {*}
*/
const removeReply = async index => {
    try {
        await replys_comment.destroy({
            where: index
          })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

/** KIEM TRA SU TON TAI CUA 1 LIKE REPLY
 * 
 * @param {replyCommentId, userId} = payload
 * 
 * @return {*}
*/
const getOneLikeReply = async obj => {
    try {
        const data = await favourites_reply_comment.findOne({
            attributes: ['id', 'replyCommentId', 'userId', 'level'],
            where: obj
        })
        // console.log(data)
        return data ? data.dataValues : false
    } catch (error) {
        console.log(error)
        return false
    }
}

/** LIKE 1 REPLY
 * 
 * @param {replyCommentId, userId} = payload
 * 
 * @return {*}
*/
const likeReply = async payload => {
    try {
        await favourites_reply_comment.create(payload)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
/** UPDATELIKE 1 REPLY
 * 
 * @param {level} = value
 * @param {replyCommentId, userId} = index
 * 
 * @return {*}
*/
const updateLikeReply = async (value, index) => {
    try {
        await favourites_reply_comment.update(value, {
            where: index
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

/** UPDATE COMMENT DANH CHO THAY DOI TRANG THAI DA DOC THONG BAO
 * 
 * @param {value}
 * 
 * @return {index}
*/
const updateComment = async (value, index) => {
    try {
        await comments_post.update(value, {
            where: index
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}


module.exports={
    getComment,
    addNewComment,
    getCommentsPost,
    removeComment,
    getOneLikeComment,
    likeComment,
    updateLikeComment,
    addNewReply,
    removeReply,
    getOneLikeReply,
    likeReply,
    updateLikeReply,

    updateComment
}