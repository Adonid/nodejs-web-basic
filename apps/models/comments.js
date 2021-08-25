const {CommentsPost, ReplysComment, FavouritesComment, FavouritesReplyComment, User, UserImage} = require('../../models')
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


module.exports={
    addNewComment,
    getCommentsPost
}