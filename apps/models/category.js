const {Category, Post, CommentsPost, FavouritesPost} = require('../../models')

/** KIEM TRA SU TON TAI CUA TAI KHOAN THEO EMAIL 
 * 
 * @param obj options - {email: "123hello@gmail.com"}...
 * 
 * @return boolean or OBJECT
*/
const getCategories = async () => {
    try {
        const categories = await Category.findAll({
            attributes: ['id', 'name', 'image', 'color']
        })
        return categories
    } catch (error) {
        // console.log(error)
        return false
    }
}



module.exports={
    getCategories,
}