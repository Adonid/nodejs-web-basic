const {post, user, user_image, category, posts_content, comments_post, replys_comment, favourites_post, favourites_comment, favourites_reply_comment, post_image, tag, post_tags} = require('../../models')
const { Op } = require("sequelize")

/** LAY 1 BAI VIET THEO DIEU KIEN - KIEM TRA SU TON TAI CUA POST
 * 
 * @param obj options - {id: 12}...
 * 
 * @return {post}
*/
const getOnePost = async obj => {
    try {
        const data = await post.findOne({
            attributes: ['id', 'title', 'marker'],
            where: obj
        })
        // console.log(data)
        return data ? data.dataValues : false
    } catch (error) {
        console.log(error)
        return false
    }
}
/** LAY NOI DUNG BAI VIET THEO DIEU KIEN - KIEM TRA SU TON TAI CUA POST
 * 
 * @param obj options - {id: 12}...
 * 
 * @return {post}
*/
const getContentPost = async obj => {
    try {
        const data = await posts_content.findOne({
            attributes: ['id', 'marker'],
            where: obj
        })
        // console.log(data)
        return data ? data.dataValues : false
    } catch (error) {
        console.log(error)
        return false
    }
}

/** LAY CAC BAI VIET THEO GIOI HAN DAU VAO
 * 
 * muc dich de lay cac bai viet khi cuon trang
 * 
 * @param {index, offset=0, limit=8} - mac dinh lay 8 bai viet moi nhat. index = object
 * 
 * @return boolean or OBJECT
*/
const getPosts = async (search="", index={}, offset=0, limit=12) => {
    try {
        const data = await post.findAll({
            attributes: ['id', 'title', 'desc', 'readTime', 'active', 'updatedAt'],
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
                    model: category,
                    attributes: ['id', 'name', 'color']
                },
                {
                    model: comments_post,
                    attributes: ['userId'],
                },
                {
                    model: favourites_post,
                    attributes: ['userId'],
                    include: [
                        {
                            model: user,
                            attributes: ['name', 'fullName']
                        }
                    ]
                },
                {
                    model: post_image,
                    attributes: ['name', 'original', 'thumbnail']
                }
            ],
            where: {
                ...index, draft: false, remove: false,
                title: {
                    [Op.like]: `%${search}%`,
                }
            },
            order: [ ['id', 'DESC'] ],
            offset: offset,
            limit: limit
        })
        // console.log(data)
        return data||false
    } catch (error) {
        console.log(error)
        return false
    }
}

/** LAY CAC BAI VIET CUA TAC GIA
 * 
 * 
 * @param {index, offset=0, limit=8} - mac dinh lay 8 bai viet moi nhat. index = object
 * 
 * @return boolean or OBJECT
*/
const getPostsAuthor = async (index={}, offset=0, limit=12) => {
    try {
        const data = await post.findAll({
            attributes: ['id', 'title', 'desc', 'readTime', 'active', 'updatedAt'],
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
                    model: category,
                    attributes: ['id', 'name', 'color']
                },
                {
                    model: comments_post,
                    attributes: ['userId'],
                },
                {
                    model: favourites_post,
                    attributes: ['userId'],
                    include: [
                        {
                            model: user,
                            attributes: ['name', 'fullName']
                        }
                    ]
                },
                {
                    model: post_image,
                    attributes: ['name', 'original', 'thumbnail']
                }
            ],
            where: {
                ...index, draft: false, remove: false
            },
            order: [ ['id', 'DESC'] ],
            offset: offset,
            limit: limit
        })
        // console.log(data)
        return data||false
    } catch (error) {
        console.log(error)
        return false
    }
}

/** LAY CAC BAI NHAP CUA TAC GIA
 * 
 * 
 * @param {id} = index
 * 
 * @return boolean or OBJECT
*/
const getPostsDraftAuthor = async (index) => {
    try {
        const data = await post.findAll({
            attributes: ['id', 'title', 'desc', 'readTime', 'active', 'updatedAt'],
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
                    model: category,
                    attributes: ['id', 'name', 'color']
                },
                {
                    model: comments_post,
                    attributes: ['userId'],
                },
                {
                    model: favourites_post,
                    attributes: ['userId'],
                    include: [
                        {
                            model: user,
                            attributes: ['name', 'fullName']
                        }
                    ]
                },
                {
                    model: post_image,
                    attributes: ['name', 'original', 'thumbnail']
                }
            ],
            where: {...index, draft: true},
            order: [ ['id', 'DESC'] ]
        })
        // console.log(data)
        return data||false
    } catch (error) {
        console.log(error)
        return false
    }
}

/** LAY CHI TIET BAI VIET
 * 
 * muc dich de lay du lieu ve bai viet cho nguoi dung DOC
 * 
 * @param {obj} - vd id: 1000
 * 
 * @return boolean or OBJECT
*/
const getDetailedPost = async obj => {
    try {
        const data = await post.findOne({
            attributes: ['id', 'title', 'desc', 'readTime', 'active', 'updatedAt'],
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
                    model: category,
                    attributes: ['name', 'imageId', 'color']
                },
                {
                    model: tag,
                    attributes: ['name', 'color']
                },
                {
                    model: posts_content,
                    attributes: ['content']
                },
                {
                    model: post_image,
                    attributes: ['type', 'name', 'original']
                },
                {
                    model: comments_post,
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
                    ]
                },
                {
                    model: favourites_post,
                    attributes: ['id', 'level'],
                    include: [
                        {
                            model: user,
                            attributes: ['name', 'fullName']
                        }
                    ]
                },
            ],
            where: obj
        })
        // console.log(data)
        return data ? data.dataValues : false
    } catch (error) {
        console.log(error)
        return false
    }
}

/** LAY CHI TIET BAI VIET DE SUA
 * 
 * @param {obj} - vd id: 1000
 * 
 * @return boolean or OBJECT
*/
const getEditPost = async obj => {
    try {
        const data = await post.findOne({
            attributes: ['id', 'title', 'desc', 'readTime', 'active'],
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
                    model: category,
                    attributes: ['id', 'name', 'imageId', 'color']
                },
                {
                    model: tag,
                    attributes: ['id', 'name', 'color']
                },
                {
                    model: posts_content,
                    attributes: ['id', 'content']
                },
                {
                    model: post_image,
                    attributes: ['id', 'type', 'name', 'original']
                },
            ],
            where: obj
        })
        // console.log(data)
        return data ? data.dataValues : false
    } catch (error) {
        console.log(error)
        return false
    }
}

/** CREATE NEW POST
 * 
 * Tao moi bai viet
 * 
 * @param {title, desc, imageId, categoryId, authorId, draft}
 * 
 * @return {true | false}
 */
const createNewPost = async dataPost => {
    const postId = await post.create(dataPost)
    .then(post => {
        // console.log(post)
        return post ? post.dataValues.id : false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return postId
}
/** UPDATE POST
 * 
 * Cap nhat bai viet
 * 
 * @param {title, desc, imageId, categoryId, authorId, draft}
 * @return {array || false}
 */
 const updatePost = async (value, index) => {
    const post = await post.update(value, {
        where: index
    })
    .then( data => {
        console.log(data)
        return data||false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return post
}

/** CREATE CONTENT TO POST
 * 
 * @param {postId, content} = dataContent
 * 
 * @return {id}
 */
 const createNewContent = async dataContent => {
    const content = await posts_content.create(dataContent)
    .then(content => {
        return content ? content.dataValues.id : false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return content
}
/** CAP NHAT NOI DUNG BAI VIET
 * 
 * 
 * @param {value, index}
 * 
 * @return {true | false}
 */
 const updateContent = async (value, index) => {
    const content = await posts_content.update(value, {
        where: index
    })
    .then( data => {
        // console.log(data)
        return data||false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return content
}

/** LUU THE TAGS & READTIME POST
 * 
 * 
 * @param {tagsId} = value
 * @param {id} = index
 * 
 * @return {true | false}
 */
 const addTags = async (tagsId, index) => {
     // Xoa toan bo the tag da gan cua bai viet nay truoc
    await post_tags.destroy({
        where: {
            postId: index.id
        }
    })
    // Lay doi tuong tags
    const tags = await tag.findAll({
        attributes: ['id', 'name'],
        where: {
            id: {
                [Op.in]: tagsId
            }
        }
    })
    .then( tag => {
        return tag||false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    // Neu tags ton tai thi cho luu
    if(tags){
        return await post.findOne({
            attributes: ['id', 'title'],
            include: [{model: tag}],
            where: index
        })
        .then( post => {
            if(post){
                post.addTag(tags)
                return true
            }
            return false
        })
        .catch(err => {
            console.log(err)
            return false
        })
    }
    return false
}

/** UPDATE PREVIEW POST 
 * 
 * 
 * @param {value, index}
 * @return {array || false}
 */
 const updatePreviewPost = async (value, index) => {
    const post = await post.update(value, {
        where: index
    })
    .then( data => {
        // console.log(data)
        return data||false
    })
    .catch(err => {
        // console.log(err)
        return false
    })
    return post
}

/** POST IS DUPLICATE (title)?
 * 
 * CO POST NAO TRUNG TEN KHONG (NGOAI TRU CHINH POST DANG KIEM TRA)
 * 
 * @param {id, title}
 * 
 * @return boolean or OBJECT
*/
const isPostDuplicate = async (id, title) => {
    try {
        const data = await post.findAll({
            attributes: ['id', 'title'],
            where: {
                id: {
                    [Op.not]: id
                },
                title: {
                    [Op.eq]: title,
                }
            }
        })
        // console.log(data)
        return data.length ? true : false
    } catch (error) {
        // console.log(error)
        return true
    }
}

/** DEM BAI VIET
 * 
 * @param {index}
 * 
 * @return boolean or OBJECT
*/
const countPosts = async index => {
    try {
        const posts = await post.count({
            where: {...index, draft: false}
        })
        return posts
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    getOnePost,
    getContentPost,
    getPosts,
    getDetailedPost,
    getPostsAuthor,
    getPostsDraftAuthor,
    getEditPost,
    
    createNewPost,
    createNewContent,
    updateContent,
    addTags,

    updatePost,
    updatePreviewPost,
    isPostDuplicate,
    countPosts
}