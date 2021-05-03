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
            attributes: ['id', 'name', 'image', 'color']
        })
        return categories.dataValues||[]
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
        return data.dataValues||[]
    } catch (error) {
        // console.log(error)
        return false
    }
}

module.exports={
    getCategories,
    getCategory
}