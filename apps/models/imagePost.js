const {post_image, user, user_image} = require('../../models')

/** LAY VE 1 DOI TUONG ANH
 * 
 * @param {type, userId} = index
 * 
 * type - STRING & unnullable
 * 
 * userId - INTERGER & unnullable
 * 
 * @returns boolean
 */
const getImage = async (index) => {
    const image = await post_image.findOne({
        attributes: ['id', 'type', 'name','original', 'thumbnail', 'updatedAt'],
        include: [
            {
                model: user,
                attributes: ['name', 'fullName'],
                include: [
                    {
                        model: user_image,
                        where: {type: 'avatar'},
                        attributes: ['name', 'thumbnail'],
                    }
                ]
            },
        ],
        where: index||{},
    })
    .then(img => {
        return img?img:false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return image
}

/** LAY VE DANH SACH DOI TUONG ANH
 * 
 * @param {type, userId} = index
 * 
 * type - STRING & unnullable
 * 
 * userId - INTERGER & unnullable
 * 
 * @returns {categories} = array
 */
const getImages = async (index) => {
    const images = await post_image.findAll({
        attributes: ['id', 'type', 'name','original', 'thumbnail'],
        where: index
    })
    .then(imgs => {
        return imgs||false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return images
}

/** LAY VE DANH SACH DOI TUONG ANH - CO GIOI HAN VA OFFSET
 * 
 * @param {id, type} = index
 * 
 * index === {} - TUC LA LAY TAT CA
 * 
 * id - NUMBER & unnullable
 * 
 * type - STRING & unnullable
 * 
 * @returns {images} = array
 */
 const queryImages = async (index, offset=0, limit=12) => {
    const images = await post_image.findAll({
        attributes: ['id', 'type', 'name','original', 'thumbnail', 'updatedAt'],
        include: [
            {
                model: user,
                attributes: ['name', 'fullName'],
                include: [
                    {
                        model: user_image,
                        where: {type: 'avatar'},
                        attributes: ['name', 'thumbnail'],
                    }
                ]
            },
        ],
        where: index||{},
        order: [
            ['id', 'DESC']
        ],
        offset: offset,
        limit: limit
    })
    .then(imgs => {
        return imgs||false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return images
}

/** TAO MOI 1 ANH CHO USER
 * 
 * @param {type, original, thumbnail, name, userId} 
 * 
 * type, original, name - STRING & unnullable
 * 
 * thumbnail - STRING - nullable
 * 
 * userId - INTERGER & unnullable
 * 
 * @returns boolean
 */
const createImage = async ({type, name, userId, original, thumbnail}) => {
    const image = await post_image.create({
        type,
        name,
        userId,
        original,
        thumbnail: thumbnail
    })
    .then(img => {
        return img?img.dataValues.id:false
    })
    .catch(err => {
        // console.log(err)
        return false
    })
    return image
}

/** CAP NHAT ANH CHO USER
 * 
 * @param {value, index} 
 * 
 * value - {name, type, origin...} - OBJECT - require
 * 
 * index - {userId, type} - OBJECT - require
 * 
 * @returns boolean
 */
const updateImage = async (value, index) => {
    const user = await post_image.update(value, {
        where: index
    })
    .then( u => {
        return u?true:false
    })
    .catch(err => {
        // console.log(err)
        return false
    })
    return user
}

/** DEM ANH UPLOAD CUA TAC GIA
 * 
 * @param {index}
 * 
 * @return boolean or OBJECT
*/
const countImages = async index => {
    try {
        const images = await post_image.count({
            where: index
        })
        return images
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports={
    getImage,
    getImages,
    queryImages,
    createImage,
    updateImage,
    countImages
}