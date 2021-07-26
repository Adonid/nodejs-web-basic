const {Category, PostImage, CommentsPost, FavouritesPost} = require('../../models')
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
            attributes: ['id', 'name', 'color', 'description'],
            include: [
                {
                    model: PostImage,
                    attributes: ['id', 'name', 'original', 'userId']
                },
            ]
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
            attributes: ['id', 'name','color', 'description'],
            include: [
                {
                    model: PostImage,
                    attributes: ['id', 'type', 'name', 'original', 'thumbnail', 'userId']
                },
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

/** TAO MOI DANH MUC
 * 
 * @param {name, imageId, color, description} = payload 
 * 
 * @returns boolean
 */
 const createCategory = async (payload) => {
    const cat = await Category.create(payload)
    .then(cat => {
        return cat?true:false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return cat
}

/** CAP NHAT FIELD(s) TRONG BANG CATEGORY
 * 
 * @param {value, index}
 * @return {array | false}
 */
 const updateCategory = async (value, index) => {
    const cat = await Category.update(value, {
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
    return cat
}

/** CATEGORY IS DUPLICATE?
 * 
 * CO DANH MUC NAO TRUNG TEN KHONG (NGOAI TRU CHINH DANH MUC DANG KIEM TRA)
 * 
 * @param {}
 * 
 * @return boolean
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
        return data.length ? true : false
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