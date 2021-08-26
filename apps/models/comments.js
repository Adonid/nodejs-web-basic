const {
    CommentsPost, 
    ReplysComment, 
    FavouritesComment, 
    FavouritesReplyComment, 
    User, UserImage
} = require('../../models')
const { Op } = require("sequelize");

/** LAY DANH SACH TOAN BO COMMENTS CUA POST
 * 
 * @param {postId} = index
 * 
 * @return {*}
*/
const getCommentsPost = async index => {
    const comments = await CommentsPost.findAll({
        attributes: ['id', 'comment', 'updatedAt'],
        include: [
            {
                model: ReplysComment,
                attributes: ['id', 'reply', 'createdAt'],
                include: [
                    {
                        model: User,
                        attributes: ['name', 'fullName'],
                        include: [
                            {
                                model: UserImage,
                                attributes: ['type', 'name', 'thumbnail']
                            }
                        ]
                    }
                ],
                include: [
                    {
                        model: FavouritesReplyComment,
                        attributes: ['id', 'level'],
                        include: [
                            {
                                model: User,
                                attributes: ['name', 'fullName']
                            }
                        ]
                    }
                ],
            }
        ],
        include: [
            {
                model: FavouritesComment,
                attributes: ['id', 'level'],
                include: [
                    {
                        model: User,
                        attributes: ['name', 'fullName']
                    }
                ]
            }
        ],
        include: [
            {
                model: User,
                attributes: ['name', 'fullName'],
                include: [
                    {
                        model: UserImage,
                        attributes: ['type', 'name', 'thumbnail']
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

/** XOA 1 COMMENT
 * 
 * @param {id} = index
 * 
 * @return {*}
*/
const removeComment = async index => {
    try {
        await CommentsPost.destroy({
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
        const data = await FavouritesComment.findOne({
            attributes: ['id'],
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
        await FavouritesComment.create(payload)
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
        await FavouritesComment.update(value, {
            where: index
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}


module.exports={
    addNewComment,
    getCommentsPost,
    removeComment,
    getOneLikeComment,
    likeComment,
    updateLikeComment
}