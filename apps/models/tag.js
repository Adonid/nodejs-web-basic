const {Category, Post,  Tag} = require('../../models')
const { Op } = require("sequelize");

/** LAY DANH SACH TAT CA CAC THE TAG
 * 
 * @param none
 * 
 * @return array [{'id', 'name', 'color'}]
*/
const getTags = async () => {
    try {
        const tags = await Tag.findAll({
            attributes: ['id', 'name', 'color'],
            include: [
                {
                    model: Post,
                    attributes: ['id', 'active']
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
        const data = await Category.findOne({
            attributes: ['id', 'name','color'],
            include: [
                {
                    model: Post,
                    attributes: ['id', 'active']
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

/** TAO MOI THE TAG
 * 
 * @param {name, imageId, color} = payload 
 * 
 * @returns boolean
 */
 const createTag = async (payload) => {
    const cat = await Tag.create(payload)
    .then(cat => {
        return cat?true:false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return cat
}

/** CAP NHAT FIELD(s) TRONG BANG TAG
 * 
 * @param {value, index}
 * @return {array | false}
 */
 const updateTag = async (value, index) => {
    const cat = await Tag.update(value, {
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

/** XOA 1 TAG NGOAI TRU CAT DAU TIEN - MAC DINH
 * 
 * @param {id}
 * @return {array | false}
 */
 const deleteTag = async (id) => {
    const resuft = await Tag.destroy({
        where: {
            id: {
                [Op.eq]: id,
                [Op.not]: 1
            }
        }
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
        const data = await Tag.findAll({
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
        const tags = await Tag.count()
        return tags
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports={
    getTags,
    getTag,
    createTag,
    updateTag,
    deleteTag,
    isTagDuplicate,
    countTags
}