const {Category, Post, CommentsPost, FavouritesPost} = require('../../models')

/** LAY DANH SACH TAT CA CAC DANH MUC 
 * 
 * @param none
 * 
 * @return array [{'id', 'name', 'image', 'color'}]
*/
const getCategories = async () => {
    try {
        const categories = await Category.findAll({
            attributes: ['id', 'name', 'image', 'color', 'description']
        })
        return categories
    } catch (error) {
        // console.log(error)
        return false
    }
}

/** LAY 1 DANH MUC THEO CAC TRUONG
 * 
 * @param obj options - {email: "Sức khỏe"}...
 * 
 * @return boolean or OBJECT
*/
const getCategory = async obj => {
    try {
        const data = await Category.findOne({
            attributes: ['id', 'name', 'image', 'color', 'description'],
            where: obj
        })
        console.log(data)
        return data ? data.dataValues : false
    } catch (error) {
        console.log(error)
        return false
    }
}

/** TAO MOI DANH MUC
 * 
 * @param {*} name 
 * @param {*} email 
 * @param {*} password 
 * 
 * @returns boolean
 */
 const createCategory = async (name, image, color, description) => {
    const user = await Category.create({
        name,
        image,
        color,
        description
    })
    .then(user => {
        return user?true:false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return user
}

module.exports={
    getCategories,
    getCategory,
    createCategory
}