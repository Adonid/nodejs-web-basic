const {Province, District, Commune} = require('../../models')
const { Op } = require("sequelize")

/** LAY DANH SACH CAC TINH/THANH PHO
 * 
 * 
 * @param void
 * 
 * @return boolean or OBJECT
*/
const getProvinces = async () => {
    try {
        const provinces = await Province.findAll({
            attributes: ['id', 'name']
        })
        return provinces
    } catch (error) {
        // console.log(error)
        return false
    }
}

/** LAY CAC QUAN/HUYEN THUOC TINH/THANH
 * 
 * 
 * @param {provinceId}
 * 
 * @return boolean or OBJECT
*/
const getDistricts = async (provinceId) => {
    try {
        const data = await District.findAll({
            attributes: ['id', 'name'],
            where: {
                provinceId: {
                    [Op.eq]: provinceId
                }
            }
        })
        return data
    } catch (error) {
        // console.log(error)
        return false
    }
}

/** LAY CAC PHUONG/XA THUOC QUAN/HUYEN
 * 
 * 
 * @param {districtId}
 * 
 * @return boolean or OBJECT
*/
const getCommunes = async (districtId) => {
    try {
        const data = await Commune.findAll({
            attributes: ['id', 'name'],
            where: {
                districtId: {
                    [Op.eq]: districtId||1
                }
            }
        })
        return data
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    getProvinces,
    getDistricts,
    getCommunes,
}