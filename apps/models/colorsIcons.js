const {colors_icons} = require('../../models')

/** LAY DANH SACH TAT CA CAC DOI TUONG
 * 
 * @param {obj}
 * 
 * @return {[]}
*/
const getColorsIcons = async obj => {
    try {
        const color = await colors_icons.findAll({
            attributes: ['id', 'name', 'alias', 'code'],
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
    getColorsIcons
}