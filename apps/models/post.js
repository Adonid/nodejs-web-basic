const {Post, User, Category, PostsContent, CommentsPost, FavouritesPost} = require('../../models')
const { Op } = require("sequelize")

/** LAY 1 BAI VIET THEO CAC TRUONG
 * 
 * muc dich de xem cac tham so dua vao co dung la bai ton tai khong
 * 
 * @param obj options - {id: 12}...
 * 
 * @return boolean or OBJECT
*/
const getOnePost = async obj => {
    try {
        const data = await Post.findOne({
            attributes: ['id', 'title', 'image', 'desc', 'readTime', 'active', 'authorId', 'categoryId'],
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
            attributes: ['id', 'title', 'image', 'desc', 'readTime', 'active'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'fullName', 'avatar', 'roleId']
                },
                {
                    model: Category,
                    attributes: ['id', 'name', 'image', 'color']
                },
                {
                    model: CommentsPost,
                    attributes: ['id', 'userId']
                },
                {
                    model: FavouritesPost,
                    attributes: ['id', 'userId']
                },
            ],
            offset,
            limit
        })
        // console.log(data)
        return data.length ? data : false
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
            attributes: ['id', 'title', 'image', 'desc', 'readTime', 'active'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'fullName', 'avatar', 'roleId']
                },
                {
                    model: Category,
                    attributes: ['id', 'name', 'image', 'color']
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

/** TAO MOI 1 NOI DUNG CHO BAI VIET
 * 
 * 
 * @param {postId, content} = dataContent
 * 
 * @return {true | false}
 */
const createNewContent = async dataContent => {
    const content = await PostsContent.create(dataContent)
    .then(content => {
        return content ? true : false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return content
}

/** CREATE NEW POST
 * 
 * Tao moi bai viet
 * 
 * @param {'title', 'image', 'desc', 'readTime', 'content', 'authorId', 'categoryId'} = dataPost
 * 
 * @return {true | false}
 */
const createNewPost = async dataPost => {
    const {title, image, desc, readTime, content, authorId, categoryId, active} = dataPost
    const postId = await Post.create({
        title,
        image,
        desc,
        readTime,
        authorId,
        categoryId,
        active
    })
    .then(post => {
        // console.log(post)
        return post ? post.dataValues.id : false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return postId ? await createNewContent({postId, content}) : false
}

/** UPDATE POST
 * 
 * Cap nhat bai viet
 * 
 * @param {value, index}
 * @return {array || false}
 */
 const updatePost = async (value, index) => {
    const post = await Post.update(value, {
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
    return post || false
}

module.exports = {
    getOnePost,
    getPosts,
    getDetailedPost,
    createNewPost,
    updatePost
}