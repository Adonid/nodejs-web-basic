const {Post, User, UserImage, Category, PostsContent, CommentsPost, ReplysComment, FavouritesPost, FavouritesComment, FavouritesReplyComment, PostImage, Tag, PostTags} = require('../../models')
const { Op } = require("sequelize")

/** LAY 1 BAI VIET THEO DIEU KIEN - KIEM TRA SU TON TAI CUA POST
 * 
 * @param obj options - {id: 12}...
 * 
 * @return {post}
*/
const getOnePost = async obj => {
    try {
        const data = await Post.findOne({
            attributes: ['id', 'title'],
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
        const data = await Post.findAll({
            attributes: ['id', 'title', 'desc', 'readTime', 'active', 'updatedAt'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'fullName'],
                    include: [
                        {
                            model: UserImage,
                            attributes: ['type', 'name', 'thumbnail']
                        }
                    ]
                },
                {
                    model: Category,
                    attributes: ['id', 'name', 'color']
                },
                {
                    model: CommentsPost,
                    attributes: ['userId'],
                },
                {
                    model: FavouritesPost,
                    attributes: ['userId'],
                    include: [
                        {
                            model: User,
                            attributes: ['name', 'fullName']
                        }
                    ]
                },
                {
                    model: PostImage,
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
        const data = await Post.findAll({
            attributes: ['id', 'title', 'desc', 'readTime', 'active', 'updatedAt'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'fullName'],
                    include: [
                        {
                            model: UserImage,
                            attributes: ['type', 'name', 'thumbnail']
                        }
                    ]
                },
                {
                    model: Category,
                    attributes: ['id', 'name', 'color']
                },
                {
                    model: CommentsPost,
                    attributes: ['userId'],
                },
                {
                    model: FavouritesPost,
                    attributes: ['userId'],
                    include: [
                        {
                            model: User,
                            attributes: ['name', 'fullName']
                        }
                    ]
                },
                {
                    model: PostImage,
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
        const data = await Post.findAll({
            attributes: ['id', 'title', 'desc', 'readTime', 'active', 'updatedAt'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'fullName'],
                    include: [
                        {
                            model: UserImage,
                            attributes: ['type', 'name', 'thumbnail']
                        }
                    ]
                },
                {
                    model: Category,
                    attributes: ['id', 'name', 'color']
                },
                {
                    model: CommentsPost,
                    attributes: ['userId'],
                },
                {
                    model: FavouritesPost,
                    attributes: ['userId'],
                    include: [
                        {
                            model: User,
                            attributes: ['name', 'fullName']
                        }
                    ]
                },
                {
                    model: PostImage,
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
        const data = await Post.findOne({
            attributes: ['id', 'title', 'desc', 'readTime', 'active', 'updatedAt'],
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
                },
                {
                    model: Category,
                    attributes: ['name', 'imageId', 'color']
                },
                {
                    model: Tag,
                    attributes: ['name', 'color']
                },
                {
                    model: PostsContent,
                    attributes: ['content']
                },
                {
                    model: PostImage,
                    attributes: ['type', 'name', 'original']
                },
                {
                    model: CommentsPost,
                    attributes: ['id', 'comment', 'updatedAt'],
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'name', 'fullName'],
                            include: [
                                {
                                    model: UserImage,
                                    attributes: ['type', 'name', 'thumbnail']
                                }
                            ]
                        },
                        {
                            model: ReplysComment,
                            attributes: ['id', 'reply', 'updatedAt'],
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
                                },
                                {
                                    model: FavouritesReplyComment,
                                    attributes: ['userId', 'level'],
                                    include: [
                                        {
                                            model: User,
                                            attributes: ['name', 'fullName']
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            model: FavouritesComment,
                            attributes: ['userId', 'level'],
                            include: [
                                {
                                    model: User,
                                    attributes: ['name', 'fullName']
                                }
                            ]
                        }
                    ]
                },
                {
                    model: FavouritesPost,
                    attributes: ['id', 'level'],
                    include: [
                        {
                            model: User,
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
        const data = await Post.findOne({
            attributes: ['id', 'title', 'desc', 'readTime', 'active'],
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
                },
                {
                    model: Category,
                    attributes: ['id', 'name', 'imageId', 'color']
                },
                {
                    model: Tag,
                    attributes: ['id', 'name', 'color']
                },
                {
                    model: PostsContent,
                    attributes: ['id', 'content']
                },
                {
                    model: PostImage,
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
    const postId = await Post.create(dataPost)
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
    const post = await Post.update(value, {
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
    return post
}

/** CREATE CONTENT TO POST
 * 
 * @param {postId, content} = dataContent
 * 
 * @return {id}
 */
 const createNewContent = async dataContent => {
    const content = await PostsContent.create(dataContent)
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
    const content = await PostsContent.update(value, {
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
    await PostTags.destroy({
        where: {
            postId: index.id
        }
    })
    // Lay doi tuong tags
    const tags = await Tag.findAll({
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
        return await Post.findOne({
            attributes: ['id', 'title'],
            include: [{model: Tag}],
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
    const post = await Post.update(value, {
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
        const data = await Post.findAll({
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
        const posts = await Post.count({
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