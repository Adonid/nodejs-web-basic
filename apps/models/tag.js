const {post, colors, user, user_image, category, comments_post, favourites_post, post_image, tag} = require('../../models')
const { Op } = require("sequelize");

/** LAY DANH SACH TAT CA CAC THE TAG
 * 
 * @param none
 * 
 * @return array [{'id', 'name', 'color'}]
*/
const getTags = async () => {
    try {
        const tags = await tag.findAll({
            attributes: ['id', 'name'],
            include: [
                {
                    model: post,
                    attributes: ['id', 'active']
                },
                {
                    model: colors,
                    attributes: ['id', 'name', 'alias', 'code']
                }
            ]
        })
        // console.log(tags)
        return tags
    } catch (error) {
        console.log(error)
        return false
    }
}

/** LAY 1 THE TAG THEO CAC TRUONG
 * 
 * @param obj options
 * 
 * @return boolean or OBJECT
*/
const getTag = async obj => {
    try {
        const data = await tag.findOne({
            attributes: ['id', 'name'],
            include: [
                {
                    model: post,
                    attributes: ['id', 'active']
                },
                {
                    model: colors,
                    attributes: ['id', 'name', 'alias', 'code']
                }
            ],
            where: obj
        })
        // console.log(data)
        // return data ? data.dataValues : false
        return data?data.dataValues:false
    } catch (error) {
        console.log(error)
        return false
    }
}

/** LAY TAT CA BAI VIET THUOC THE NAY
 * 
 * @param obj options
 * 
 * @return {posts}
*/
const getPosts = async (obj) => {
    try {
        const data = await tag.findAll({
            attributes: ['id', 'name'],
            include: [
                {
                    model: post,
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
                            attributes: ['id', 'name'],
                            include: [
                                {
                                    model: colors,
                                    attributes: ['id', 'name', 'alias', 'code'],
                                }   
                            ]
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
                        active: true, draft: false, remove: false,
                    },
                    order: [ ['id', 'DESC'] ],
                },
                {
                    model: colors,
                    attributes: ['id', 'name', 'alias', 'code']
                }
            ],
            where: obj
        })
        return data
    } catch (error) {
        console.log(error)
        return false
    }
}


/** TAO MOI THE TAG
 * 
 * @param {name, imageId, color} = payload 
 * 
 * @returns boolean
 */
 const createTag = async (payload) => {
    const data = await tag.create(payload)
    .then(cat => {
        return cat?true:false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return data
}

/** CAP NHAT FIELD(s) TRONG BANG TAG
 * 
 * @param {value, index}
 * @return {array | false}
 */
 const updateTag = async (value, index) => {
    const data = await tag.update(value, {
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
    return data
}

/** XOA 1 TAG NGOAI TRU CAT DAU TIEN - MAC DINH
 * 
 * @param {id}
 * @return {array | false}
 */
 const deleteTag = async (id) => {
    const resuft = await tag.destroy({
        where: {id}
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return resuft
}

/** TAG IS DUPLICATE?
 * 
 * CO THE TAG NAO TRUNG TEN KHONG (NGOAI TRU CHINH THE TAG DANG KIEM TRA)
 * 
 * @param {}
 * 
 * @return boolean
*/
const isTagDuplicate = async (id, name) => {
    try {
        const data = await tag.findAll({
            attributes: ['id', 'name'],
            where: {
                id: {
                    [Op.not]: id
                },
                name: {
                    [Op.eq]: name,
                }
            }
        })
        // console.log(data)
        return data.length ? true : false
    } catch (error) {
        console.log(error)
        return true
    }
}

/** DEM THE TAG
 * 
 * @param {index}
 * 
 * @return boolean or OBJECT
*/
const countTags = async index => {
    try {
        const tags = await tag.count()
        return tags
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports={
    getTags,
    getTag,
    getPosts,
    createTag,
    updateTag,
    deleteTag,
    isTagDuplicate,
    countTags
}