const {User, UserImage} = require('../../models')

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
    const image = await UserImage.create({
        type,
        name,
        userId,
        original,
        thumbnail: thumbnail
    })
    .then(img => {
        return img?true:false
    })
    .catch(err => {
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
    const user = await UserImage.update(value, {
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

module.exports={
    createImage,
    updateImage
}