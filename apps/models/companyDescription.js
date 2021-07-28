const {CompanyDescription} = require('../../models')

/** LAY DANH SACH TAT CA CAC MO TA TRANG
 * 
 * @param none
 * 
 * @return array [{'id', 'name', 'color', icon, description}]
*/
const getCompanysDescription = async () => {
    try {
        const description = await CompanyDescription.findAll({
            attributes: ['id', 'name', 'color', 'icon', 'description']
        })
        // console.log(description)
        return description
    } catch (error) {
        console.log(error)
        return false
    }
}

/** LAY 1 MO TA TRANG THEO CAC TRUONG
 * 
 * @param obj options
 * 
 * @return boolean or OBJECT
*/
const getCompanyDescription = async obj => {
    try {
        const data = await CompanyDescription.findOne({
            attributes: ['id', 'name','color'],
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

/** TAO MOI MO TA TRANG
 * 
 * @param {name, imageId, color} = payload 
 * 
 * @returns boolean
 */
 const createCompanyDescription = async (payload) => {
    const description = await CompanyDescription.create(payload)
    .then(description => {
        return description?true:false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return description
}

/** CAP NHAT FIELD(s) TRONG BANG TAG
 * 
 * @param {value, index}
 * @return {array | false}
 */
 const updateCompanyDescription = async (value, index) => {
    const description = await CompanyDescription.update(value, {
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
    return description
}

/** XOA 1 TAG NGOAI TRU CAT DAU TIEN - MAC DINH
 * 
 * @param {id}
 * @return {array | false}
 */
 const deleteCompanyDescription = async (id) => {
    const resuft = await CompanyDescription.destroy({
        where: {id}
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return resuft
}

module.exports={
    getCompanysDescription,
    getCompanyDescription,
    createCompanyDescription,
    updateCompanyDescription,
    deleteCompanyDescription
}