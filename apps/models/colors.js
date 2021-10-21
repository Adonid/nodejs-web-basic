const {colors} = require('../../models')

/** LAY DANH SACH TAT CA CAC MAU
 * 
 * @param none
 * 
 * @return {[]}
*/
const getColors = async () => {
    try {
        const color = await colors.findAll({
            attributes: ['id', 'name', 'alias', 'code']
        })
        // console.log(color)
        return color
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports={
    getColors
}