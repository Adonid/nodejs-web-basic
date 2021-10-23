const {icons} = require('../../models')

/** LAY DANH SACH TAT CA CAC DOI TUONG
 * 
 * @param {obj}
 * 
 * @return {[]}
*/
const getIcons = async (obj={}) => {
    try {
        const color = await icons.findAll({
            attributes: ['id', 'label', 'icon', 'alias'],
            where: obj
        })
        // console.log(color)
        return color
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports={
    getIcons
}