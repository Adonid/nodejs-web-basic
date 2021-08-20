const {Post, User, UserImage, Category, PostsContent, CommentsPost, FavouritesPost, PostImage, Tag} = require('../../models')
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
 * @param {offset=0, limit=8} - mac dinh lay 8 bai viet moi nhat
 * 
 * @return boolean or OBJECT
*/
const getPosts = async (offset=0, limit=8) => {
    try {
        const data = await Post.findAll({
            attributes: ['id', 'title', 'desc', 'readTime', 'active'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'fullName', 'roleId'],
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
                    model: CommentsPost,
                    attributes: ['id', 'userId']
                },
                {
                    model: FavouritesPost,
                    attributes: ['id', 'userId']
                },
                {
                    model: PostImage,
                    attributes: ['id', 'type', 'name', 'original', 'thumbnail', 'userId']
                },
                {
                    model: Tag,
                    attributes: ['id', 'name', 'color']
                },
            ],
            where: {draft: false, remove: false},
            offset,
            limit
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
            attributes: ['id', 'title', 'desc', 'readTime', 'active'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'fullName', 'avatar', 'roleId']
                },
                {
                    model: Category,
                    attributes: ['id', 'name', 'imageId', 'color']
                },
                {
                    model: CommentsPost,
                    attributes: ['id', 'userId']
                },
                {
                    model: FavouritesPost,
                    attributes: ['id', 'userId']
                },
                {
                    model: PostsContent,
                    attributes: ['content']
                },
                {
                    model: PostImage,
                    attributes: ['id', 'type', 'name', 'original', 'thumbnail', 'userId']
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
        // console.log(err)
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

module.exports = {
    getOnePost,
    getPosts,
    getDetailedPost,
    
    createNewPost,
    createNewContent,
    updateContent,
    addTags,

    updatePost,
    updatePreviewPost,
    isPostDuplicate
}