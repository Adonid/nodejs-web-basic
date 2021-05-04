const {Category, Post, CommentsPost, FavouritesPost} = require('../../models')
const { Op } = require("sequelize");

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
        // console.log(data)
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
    return user ? await getCategories() : false
}

/** CAP NHAT FIELD(s) TRONG BANG USER
 * 
 * @param {value, index}
 * @return {array | false}
 */
 const updateCategory = async (value, index) => {
    const category = await Category.update(value, {
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
    if(category){
        const data = await getCategories()
        return data ? data : false
    }
    return false
}

/** CATEGORY IS DUPLICATE?
 * 
 * CO DANH MUC NAO TRUNG TEN KHONG (NGOAI TRU CHINH DANH MUC DANG KIEM TRA)
 * 
 * @param {}
 * 
 * @return boolean or OBJECT
*/
const isCategoryDuplicate = async (id, name) => {
    try {
        const data = await Category.findAll({
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
        return data ? true : false
    } catch (error) {
        console.log(error)
        return true
    }
}

module.exports={
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    isCategoryDuplicate
}